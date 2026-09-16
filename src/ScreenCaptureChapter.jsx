export default function ScreenCaptureChapter() {
  return (
    <section className="chapter-with-sidenote" id="screen-capture">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">05</span><span>Screen Capture Is Not One API (draft)</span></h2>
        <p>Now that my camera was actually producing 30 frames per second, I wanted to go further.</p>

        <p>I had timestamps for the individual stages. I knew how long I waited for a camera frame, how long compression took, and how long the sender spent submitting UDP packets.</p>

        <p>But I still wanted to answer the more obvious question:</p>

        <blockquote><p>How far behind reality is the image on the other screen?</p></blockquote>

        <p>The useful end-to-end measurement for camera video is usually called glass-to-glass: from something happening in front of the camera to that change appearing on the receiving display.</p>

        <p>Screen sharing gave me a convenient experiment. Put a changing timer on one screen, stream it to the other computer, and compare the original with the received image. The actual measurement has some complications, which I will get into later, but at least I would have something visible to compare.</p>

        <p>It also gave me another source to play with.</p>

        <p>My ThinkPad’s screen runs at 60 Hz. The display connected to my Mac mini runs at 100 Hz. My camera had just made me fight for 30 FPS.</p>

        <p>So my first thought was: could I use the screen as a faster source of images?</p>

        <p>Potentially. But there was a catch.</p>

        <h3>A 100 Hz display is not a 100 FPS capture stream</h3>

        <p>A display refreshing at 100 Hz has a refresh period of:</p>

        <pre className="article-code"><code>{"1 / 100 = 10 ms"}</code></pre>

        <p>That does not mean my program receives a new captured image every 10 milliseconds.</p>

        <p>Display refresh, capture delivery, encoding, and presentation on the receiving machine all have their own timing. In fact, my first Mac screen-capture implementation still requested 30 FPS.</p>

        <p>The 33.3 ms frame period at 30 FPS is also not automatically 33.3 ms of latency added to every frame. A change could happen just before the next capture opportunity, or just after one. In a simplified model, randomly timed changes wait half a frame period on average.</p>

        <p>Higher capture rates could help. They were an experiment to run, not a performance improvement I had already earned.</p>

        <p>First, I needed to get the pixels.</p>

        <p>Which sounded easy enough.</p>

        <p>The computer already knows what is on its screen. Surely I can just ask for that image?</p>

        <h3>Who asks for the next frame?</h3>

        <p>My camera implementation had a fairly straightforward shape:</p>

        <pre className="article-code"><code>{"claim a free slot\n    → wait for a camera frame\n    → copy it into the slot\n    → publish the slot\n    → repeat"}</code></pre>

        <p>Melquíades owned that loop. Its <code>FrameSource</code> interface exposed a <code>next_frame()</code> method, and the Linux implementation waited for V4L2 to provide a completed camera buffer.</p>

        <p>This was not a loop constantly asking “is it done yet?” The operation could block while waiting. But the application still initiated the request.</p>

        <p>Screen capture changed that relationship.</p>

        <p>Both PipeWire on Linux and ScreenCaptureKit on macOS deliver output through callbacks. I register a handler, start the capture machinery, and get called when there is output to process.</p>

        <pre className="article-code"><code>{"capture system invokes my callback\n    → inspect the supplied image\n    → copy it into a free pool slot\n    → publish the slot\n    → return"}</code></pre>

        <p>Now the question was less “how do I fetch the next frame?” and more:</p>

        <blockquote><p>A frame has arrived. Where can I put it before returning control?</p></blockquote>

        <p>Conveniently, the previous chapter had already given me somewhere to put it.</p>

        <p>The frame pool stayed. I added a <code>publish_strided()</code> operation so a callback could copy an externally supplied image into a free slot and publish it to the sender.</p>

        <p>The platform-specific part was everything that happened before that handoff.</p>

        <h3>Linux: permission first, pixels second</h3>

        <p>On Linux, my screen-capture path used the XDG ScreenCast portal and PipeWire.</p>

        <p>Those are two different parts of the process.</p>

        <p>The portal handles the request to share something. PipeWire delivers the resulting video stream.</p>

        <pre className="article-code"><code>{"Melquíades\n    → request screen sharing through the portal\n    → user selects a monitor\n    → receive an authorized PipeWire connection\n    → receive frame buffers through PipeWire"}</code></pre>

        <p>I used <code>ashpd</code> to talk to the portal from Rust. It wraps the portal’s D-Bus interfaces using <code>zbus</code>.</p>

        <p>This led to another small rabbit hole.</p>

        <blockquote><p>Detour: what is D-Bus?</p><p>D-Bus lets separate programs exchange structured messages. A program can call a method exposed by another program, read a property, or receive a signal.</p><p>Here, Melquíades connects to the user’s session bus and talks to the desktop portal service.</p><p><code>zbus</code> implements the D-Bus protocol in Rust. <code>ashpd</code> builds the portal-specific API on top of it.</p><p>The important distinction for this project: D-Bus carries the conversation about screen sharing. The video frames arrive through PipeWire.</p></blockquote>

        <p>The portal is a standard interface backed by desktop-specific implementations. That lets an application make a screen-sharing request without implementing a separate permission and selection interface for every desktop environment. Portals are also available to applications running outside a sandbox. <a href="https://flatpak.github.io/xdg-desktop-portal/docs/">XDG Desktop Portal documentation</a></p>

        <p>My request was deliberately narrow:</p>

        <pre className="article-code"><code>{"one monitor\ncursor included in the image\nno persistent permission"}</code></pre>

        <p>The code creates a session, selects those source options, and starts the request.</p>

        <p>Once the user has selected a monitor, the response identifies its PipeWire stream. I then ask the portal for a file descriptor representing an authorized PipeWire connection.</p>

        <p>The stream’s node ID tells me which source to connect to. The file descriptor gives me the connection through which I can access it. Neither one is an image yet. <a href="https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.ScreenCast.html">ScreenCast portal specification</a></p>

        <p>That was the first useful distinction:</p>

        <blockquote><p>Permission to capture a screen and delivery of its pixels are separate problems.</p></blockquote>

        <h3>PipeWire gives me a buffer, temporarily</h3>

        <p>With authorization handled, I create a PipeWire stream and describe the image format I can accept.</p>

        <p>For this first implementation, that meant raw BGRx pixels at a fixed width and height.</p>

        <p>Each pixel occupies four bytes:</p>

        <pre className="article-code"><code>{"blue | green | red | unused"}</code></pre>

        <p>My raw pipeline ignores the fourth byte when displaying the image, so this layout works with its BGRA-style representation.</p>

        <p>PipeWire negotiates the format, and my code checks what it actually agreed to provide. This is the same lesson the webcam had already taught me: requesting a configuration is not the same as verifying the result.</p>

        <p>When PipeWire invokes the process callback, I dequeue an available buffer.</p>

        <p>Yes, there is still a dequeue operation. The difference is that it happens inside PipeWire’s callback, rather than inside my own “wait for the next camera frame” loop. <a href="https://docs.pipewire.org/page_tutorial5.html">PipeWire capture tutorial</a></p>

        <p>The callback checks the buffer, copies its image into the pool, and releases it back to PipeWire.</p>

        <pre className="article-code"><code>{"PipeWire buffer\n    → copy into Melquíades slot\n    → publish SlotId\n    → return PipeWire buffer"}</code></pre>

        <p>Why copy?</p>

        <p>Because this buffer belongs to the capture system. My sender might still be compressing or sending the image after the callback returns.</p>

        <p>Passing the sender a pointer would not magically transfer ownership of those pixels.</p>

        <p>For this implementation, an independent copy gave me a clear boundary: PipeWire could reuse its buffer, and Melquíades could keep working on its own image.</p>

        <h3>macOS: ScreenCaptureKit</h3>

        <p>On the Mac, I used ScreenCaptureKit through the Rust <code>screencapturekit</code> crate.</p>

        <p>The setup looked different:</p>

        <pre className="article-code"><code>{"query shareable content\n    → choose a display\n    → configure the output\n    → register a handler\n    → start capture"}</code></pre>

        <p>My initial implementation selects the first returned display and requests:</p>

        <pre className="article-code"><code>{"1920 × 1080\nBGRA pixels\n30 FPS"}</code></pre>

        <p>When output arrives, ScreenCaptureKit invokes <code>did_output_sample_buffer()</code>.</p>

        <p>And now we get some very Apple names.</p>

        <p>The callback receives a <code>CMSampleBuffer</code>. From that, I obtain a <code>CVPixelBuffer</code>. Underneath the screen image is an <code>IOSurface</code>.</p>

        <p>These names describe different responsibilities:</p>

        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Object</th><th scope="col">What I need it for</th></tr></thead>
          <tbody>
            <tr><th scope="row"><code>CMSampleBuffer</code></th><td>The media sample, including timing and attachments</td></tr>
            <tr><th scope="row"><code>CVPixelBuffer</code></th><td>The image’s dimensions, format, and pixel storage</td></tr>
            <tr><th scope="row"><code>IOSurface</code></th><td>Shareable image storage backing the captured screen content</td></tr>
          </tbody>
        </table></div>

        <p>Apple describes ScreenCaptureKit’s video samples as IOSurface-backed. That matters later, because the image can be passed into other media APIs without first copying the entire raw frame into my own byte array. <a href="https://developer.apple.com/videos/play/wwdc2022/10156/">Meet ScreenCaptureKit</a></p>

        <p>For the first raw screen-sharing path, though, I kept the same boundary as Linux.</p>

        <p>The handler obtains the pixel buffer, checks its dimensions and format, locks it for CPU reading, and copies the image into the frame pool.</p>

        <pre className="article-code"><code>{"ScreenCaptureKit callback\n    → obtain CVPixelBuffer\n    → lock for reading\n    → copy into Melquíades slot\n    → release the lock\n    → return"}</code></pre>

        <p>Different setup. Different object types. Same ownership question.</p>

        <p>How do I keep this image available to my sender without holding up the capture system?</p>

        <h3>An image is rectangular. Its memory has opinions.</h3>

        <p>There was another detail hiding inside “copy the image.”</p>

        <p>I had been treating a raw frame as tightly packed rows:</p>

        <pre className="article-code"><code>{"bytes per row = width × bytes per pixel"}</code></pre>

        <p>But a capture buffer can have padding after each row.</p>

        <p>The distance from the start of one row to the start of the next is called its stride. That distance can be larger than the number of useful pixel bytes in the row.</p>

        <p>For a tiny, hypothetical BGRA image three pixels wide:</p>

        <pre className="article-code"><code>{"3 pixels × 4 bytes = 12 useful bytes per row\n\nSource stride: 16 bytes\n\nSource:\n[12 bytes of pixels][4 bytes of padding]\n[12 bytes of pixels][4 bytes of padding]\n\nMy pool:\n[12 bytes of pixels][12 bytes of pixels]"}</code></pre>

        <p>If I copied the first 24 bytes as one continuous image, I would copy the first row, its padding, and only part of the second row.</p>

        <p>The byte count would look right. The image would not.</p>

        <p>So <code>publish_strided()</code> copies one row at a time:</p>

        <pre className="article-code"><code>{"for row in 0..height {\n    let source_start = row * source_stride;\n    let destination_start = row * row_bytes;\n\n    destination[destination_start..destination_start + row_bytes]\n        .copy_from_slice(\n            &source[source_start..source_start + row_bytes]\n        );\n}"}</code></pre>

        <p>Both platform backends use this operation.</p>

        <p>After that copy, every downstream stage sees the same tightly packed layout. It does not need to know how PipeWire or Core Video arranged the original rows.</p>

        <h3>The pool still does its job</h3>

        <p>This was where the previous chapter’s work paid off.</p>

        <p>I did not need a new ownership scheme for every operating system.</p>

        <p>Once a screen frame reached the pool, the lifecycle remained:</p>

        <pre className="article-code"><code>{"Free\n    → capture owns it\n    → Ready\n    → sender owns it\n    → Free"}</code></pre>

        <p>If no slot was available, the callback dropped the incoming frame.</p>

        <p>It did not wait for compression. It did not wait for UDP. The sender could still discard stale ready frames and keep the newest one.</p>

        <p>The pool was larger now. Four 1080p BGRA slots occupy about 31.6 MiB, compared with roughly 2.34 MiB for the original camera frames. But the number of outstanding raw frames stayed bounded.</p>

        <p>That does not eliminate every queue in the operating system. It bounds the particular handoff I control.</p>

        <p>There was also a measurement trap here.</p>

        <p>For the camera, my capture timestamp began before waiting for a frame. For screen capture, it began inside the callback, after the capture system had already done work.</p>

        <p>A smaller capture interval did not prove that screen capture was magically faster. The two measurements started at different events.</p>

        <p>Apparently, every chapter of this project needed another opportunity to distrust a timestamp.</p>

        <h3>One copy now, another path later</h3>

        <p>The first screen-sharing implementation copied raw pixels into the pool and fed the existing DEFLATE sender.</p>

        <p>Later, the Mac H.264 path took a different route:</p>

        <pre className="article-code"><code>{"ScreenCaptureKit\n    → IOSurface\n    → VideoToolbox encoder\n    → encoded frame queue\n    → UDP"}</code></pre>

        <p>That path avoided my application’s full raw-frame copy before encoding. It did not make the entire system zero-copy, but it removed one expensive boundary.</p>

        <p>For now, though, I had reached the next milestone.</p>

        <p>Melquíades could capture screens through two different operating-system APIs and feed those images into a working streaming pipeline.</p>

        <p>Getting the pixels was no longer the problem.</p>

        <p>I now had roughly eight megabytes per frame, arriving repeatedly, and a sender that had to make those bytes practical to move across the network.</p>

        <p>DEFLATE had gotten me this far.</p>

        <p>Next, I needed to understand where it stopped being enough.</p>
      </div>
    </section>
  )
}
