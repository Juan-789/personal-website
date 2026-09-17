function XdgScreenCastNote() {
  return (
    <div className="sidenote-anchor sidenote-left" id="xdg-screencast-note">
      <aside className="article-sidenote" aria-label="Further reading: XDG ScreenCast portal">
        <span className="sidenote-type">FURTHER READING</span>
        <h3>XDG ScreenCast portal</h3>
        <p>
          I used a Rust binding for this, but the official portal documentation was still genuinely useful for
          understanding what the interface can do and what an implementation provides.
        </p>
        <a href="https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.impl.portal.ScreenCast.html">
          Read the ScreenCast implementation docs →
        </a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>FURTHER READING</span> XDG ScreenCast portal</summary>
        <p>
          I used a Rust binding for this, but the official portal documentation was still genuinely useful for
          understanding what the interface can do and what an implementation provides.
        </p>
        <a href="https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.impl.portal.ScreenCast.html">
          Read the ScreenCast implementation docs →
        </a>
      </details>
    </div>
  )
}

function PipeWireNote() {
  return (
    <div className="sidenote-anchor" id="pipewire-note">
      <aside className="article-sidenote" aria-label="Further reading: PipeWire">
        <span className="sidenote-type">FURTHER READING</span>
        <h3>PipeWire</h3>
        <p>
          PipeWire is the Linux multimedia layer that delivers the actual video buffers. In Melquiades, the portal
          handles consent and source selection; PipeWire is where the pixels arrive.
        </p>
        <a href="https://pipewire.org/">PipeWire project site →</a>
        <a href="https://pipewire.pages.freedesktop.org/pipewire-rs/pipewire/">pipewire-rs docs →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>FURTHER READING</span> PipeWire</summary>
        <p>
          PipeWire is the Linux multimedia layer that delivers the actual video buffers. In Melquiades, the portal
          handles consent and source selection; PipeWire is where the pixels arrive.
        </p>
        <a href="https://pipewire.org/">PipeWire project site →</a>
        <a href="https://pipewire.pages.freedesktop.org/pipewire-rs/pipewire/">pipewire-rs docs →</a>
      </details>
    </div>
  )
}

function AshpdNote() {
  return (
    <div className="sidenote-anchor sidenote-left" id="ashpd-note">
      <aside className="article-sidenote" aria-label="Under the hood: ashpd">
        <span className="sidenote-type">UNDER THE HOOD</span>
        <h3>ashpd</h3>
        <p>
          <code>ashpd</code> is a Rust wrapper around the XDG Desktop Portal D-Bus interfaces. Its name is a funny
          <a href="https://store.steampowered.com/app/400/Portal/">Portal</a> reference: <strong>Aperture Science
          Handheld Portal Device</strong>.
        </p>
        <a href="https://docs.rs/ashpd/0.13.13/ashpd/">Read the ashpd docs →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> ashpd</summary>
        <p>
          <code>ashpd</code> is a Rust wrapper around the XDG Desktop Portal D-Bus interfaces. Its name is a funny
          <a href="https://store.steampowered.com/app/400/Portal/">Portal</a> reference: <strong>Aperture Science
          Handheld Portal Device</strong>.
        </p>
        <a href="https://docs.rs/ashpd/0.13.13/ashpd/">Read the ashpd docs →</a>
      </details>
    </div>
  )
}

function BgraNote() {
  return (
    <div className="sidenote-anchor" id="bgra-note">
      <aside className="article-sidenote" aria-label="Detour: what is BGRA">
        <span className="sidenote-type">DETOUR</span>
        <h3>What is BGRA?</h3>
        <p>
          BGRA describes the order of a pixel&apos;s colour channels in memory: <strong>Blue, Green, Red, Alpha</strong>.
          In Melquiades, each channel occupies one byte, with a value from 0 to 255. That makes each pixel four bytes.
        </p>
        <pre className="sidenote-code"><code>{'[blue][green][red][alpha]'}</code></pre>
        <p>
          Alpha describes opacity: 0 is fully transparent, and 255 is fully opaque. An opaque red pixel therefore
          looks like <code>[0][0][255][255]</code>. The order matters. If the renderer reads those bytes as RGBA, it
          interprets the red channel as blue.
        </p>
        <p>
          PipeWire&apos;s BGRx source has the same blue, green, red ordering, but its fourth <code>x</code> byte is unused
          here. This is also where the raw-frame arithmetic comes from: <code>1920 × 1080 × 4 = 8,294,400</code> bytes.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> What is BGRA?</summary>
        <p>
          BGRA describes the order of a pixel&apos;s colour channels in memory: <strong>Blue, Green, Red, Alpha</strong>.
          In Melquiades, each channel occupies one byte, with a value from 0 to 255. That makes each pixel four bytes.
        </p>
        <pre className="sidenote-code"><code>{'[blue][green][red][alpha]'}</code></pre>
        <p>
          Alpha describes opacity: 0 is fully transparent, and 255 is fully opaque. An opaque red pixel therefore
          looks like <code>[0][0][255][255]</code>. The order matters. If the renderer reads those bytes as RGBA, it
          interprets the red channel as blue.
        </p>
        <p>
          PipeWire&apos;s BGRx source has the same blue, green, red ordering, but its fourth <code>x</code> byte is unused
          here. This is also where the raw-frame arithmetic comes from: <code>1920 × 1080 × 4 = 8,294,400</code> bytes.
        </p>
      </details>
    </div>
  )
}

function ScreenCaptureKitCrateNote() {
  return (
    <div className="sidenote-anchor" id="screencapturekit-crate-note">
      <aside className="article-sidenote" aria-label="Further reading: the screencapturekit crate">
        <span className="sidenote-type">FURTHER READING</span>
        <h3>The <code>screencapturekit</code> crate</h3>
        <p>
          <code>screencapturekit</code> provides Rust bindings to Apple&apos;s ScreenCaptureKit framework, the macOS
          machinery for capturing displays, windows, and application content.
        </p>
        <p>
          I used it to select a display, configure the image dimensions and pixel format, and register a handler to
          receive captured samples.
        </p>
        <p>
          macOS performs the actual capture. The crate exposes that functionality through Rust types and methods,
          including the <code>SCStreamOutputTrait</code> callback used in Melquiades. Those samples give my code access
          to native image buffers, which I can copy into the frame pool or pass into the later VideoToolbox encoding
          path. Screen Recording permission is still controlled by macOS.
        </p>
        <a href="https://docs.rs/screencapturekit/latest/screencapturekit/">Read the crate&apos;s documentation →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>FURTHER READING</span> The <code>screencapturekit</code> crate</summary>
        <p>
          <code>screencapturekit</code> provides Rust bindings to Apple&apos;s ScreenCaptureKit framework, the macOS
          machinery for capturing displays, windows, and application content.
        </p>
        <p>
          I used it to select a display, configure the image dimensions and pixel format, and register a handler to
          receive captured samples.
        </p>
        <p>
          macOS performs the actual capture. The crate exposes that functionality through Rust types and methods,
          including the <code>SCStreamOutputTrait</code> callback used in Melquiades. Those samples give my code access
          to native image buffers, which I can copy into the frame pool or pass into the later VideoToolbox encoding
          path. Screen Recording permission is still controlled by macOS.
        </p>
        <a href="https://docs.rs/screencapturekit/latest/screencapturekit/">Read the crate&apos;s documentation →</a>
      </details>
    </div>
  )
}

function WhyCopyNote() {
  return (
    <div className="sidenote-anchor sidenote-left" id="why-copy-note">
      <aside className="article-sidenote" aria-label="Under the hood: why not just pass a pointer">
        <span className="sidenote-type">UNDER THE HOOD</span>
        <h3>Why not just pass a pointer?</h3>
        <p>
          You can, but a pointer tells you where the bytes are, not whether they still contain the same image.
        </p>
        <p>
          Suppose PipeWire gives me buffer A containing frame 100. I pass its address to the sender, then return the
          buffer to PipeWire. Before the sender finishes reading, PipeWire reuses A for frame 103. The address has not
          changed. The image has. Reading while the buffer is being overwritten could even produce a mixture.
        </p>
        <p>
          In my callback, dropping the buffer handle returns it to PipeWire. Keeping a pointer elsewhere does not
          prevent that reuse. Avoiding the copy would mean keeping the original buffer checked out until the sender
          finishes, then returning it. PipeWire supports that approach, but holding its limited buffers longer can
          reduce what remains available for capture.
        </p>
        <p>
          Copying into my own pool lets PipeWire reuse its buffer promptly while the sender works on an independent
          image. It is a tradeoff between copying bytes and coordinating buffer lifetimes.
        </p>
        <a href="https://docs.pipewire.org/page_streams.html">Read about PipeWire&apos;s buffer lifecycle →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> Why not just pass a pointer?</summary>
        <p>You can, but a pointer tells you where the bytes are, not whether they still contain the same image.</p>
        <p>
          Suppose PipeWire gives me buffer A containing frame 100. I pass its address to the sender, then return the
          buffer to PipeWire. Before the sender finishes reading, PipeWire reuses A for frame 103. The address has not
          changed. The image has. Reading while the buffer is being overwritten could even produce a mixture.
        </p>
        <p>
          In my callback, dropping the buffer handle returns it to PipeWire. Keeping a pointer elsewhere does not
          prevent that reuse. Avoiding the copy would mean keeping the original buffer checked out until the sender
          finishes, then returning it. PipeWire supports that approach, but holding its limited buffers longer can
          reduce what remains available for capture.
        </p>
        <p>
          Copying into my own pool lets PipeWire reuse its buffer promptly while the sender works on an independent
          image. It is a tradeoff between copying bytes and coordinating buffer lifetimes.
        </p>
        <a href="https://docs.pipewire.org/page_streams.html">Read about PipeWire&apos;s buffer lifecycle →</a>
      </details>
    </div>
  )
}

function ZbusNote() {
  return (
    <div className="sidenote-anchor" id="zbus-note">
      <aside className="article-sidenote" aria-label="Further reading: zbus">
        <span className="sidenote-type">FURTHER READING</span>
        <h3>zbus</h3>
        <p>
          <code>zbus</code> is the Rust library underneath this portal conversation. Its book is great if you want to
          understand D-Bus itself, not just use a wrapper around it.
        </p>
        <a href="https://z-galaxy.github.io/zbus/">Read the zbus book →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>FURTHER READING</span> zbus</summary>
        <p>
          <code>zbus</code> is the Rust library underneath this portal conversation. Its book is great if you want to
          understand D-Bus itself, not just use a wrapper around it.
        </p>
        <a href="https://z-galaxy.github.io/zbus/">Read the zbus book →</a>
      </details>
    </div>
  )
}

export default function ScreenCaptureChapter() {
  return (
    <section className="chapter-with-sidenote" id="screen-capture">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">05</span><span>Screen Capture Is Not One API</span></h2>
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

        <p>Melquiades owned that loop. Its <code>FrameSource</code> interface exposed a <code>next_frame()</code> method, which waited for V4L2 to provide a completed camera buffer. Once it returned, my code processed the frame and called it again.</p>

        <p>Screen capture gave my code a different shape.</p>

        <p>In my PipeWire and ScreenCaptureKit backends, I registered a handler and started the stream. The capture system then called my handler whenever there was output to process.</p>

        <p>With the camera, my code called a function to obtain the next frame. With screen capture, the capture system called my code to handle incoming output.</p>


        <pre className="article-code"><code>{"capture system invokes my callback\n    → inspect the supplied image\n    → copy it into a free pool slot\n    → publish the slot\n    → return"}</code></pre>

        <p>Now the question was less “how do I fetch the next frame?” and more:</p>

        <blockquote><p>A frame has arrived. Where can I put it before returning control?</p></blockquote>

        <p>Conveniently, the previous chapter had already given me somewhere to put it.</p>

        <p>The frame pool stayed. I added a <code>publish_strided()</code> operation so a callback could copy an externally supplied image into a free slot and publish it to the sender.</p>

        <p>The platform-specific part was everything that happened before that handoff.</p>

        <h3>Linux: permission first, pixels second</h3>

        <div className="sidenote-row">
          <p>
            On Linux, my screen-capture path used the <a className="sidenote-reference" href="#xdg-screencast-note">XDG ScreenCast portal</a>{' '}
            and <a className="sidenote-reference" href="#pipewire-note">PipeWire</a>.
          </p>
          <XdgScreenCastNote />
          <PipeWireNote />
        </div>

        <p>Those are two different parts of the process.</p>

        <p>The portal handles the request to share something. PipeWire delivers the resulting video stream.</p>

        <pre className="article-code"><code>{"Melquiades\n    → request screen sharing through the portal\n    → user selects a monitor\n    → receive an authorized PipeWire connection\n    → receive frame buffers through PipeWire"}</code></pre>

        <div className="sidenote-row">
          <p>
            I used <a className="sidenote-reference" href="#ashpd-note"><code>ashpd</code></a> to talk to the portal
            from Rust. It wraps the portal&apos;s D-Bus interfaces.
          </p>
          <AshpdNote />
        </div>

        <p>The portal is a standard interface backed by desktop-specific implementations. That lets an application make a screen-sharing request without implementing a separate permission and selection interface for every desktop environment. Portals are also available to applications running outside a sandbox. <a href="https://flatpak.github.io/xdg-desktop-portal/docs/">XDG Desktop Portal documentation</a></p>

        <div className="sidenote-row">
          <p>
            Underneath, <code>ashpd</code> uses <a className="sidenote-reference" href="#zbus-note"><code>zbus</code></a>{' '}
            for that D-Bus conversation.
          </p>
          <ZbusNote />
        </div>

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

        <div className="sidenote-row">
          <p>
            My raw pipeline ignores the fourth byte when displaying the image, so this layout works with its{' '}
            <a className="sidenote-reference" href="#bgra-note">BGRA-style representation</a>.
          </p>
          <BgraNote />
        </div>

        <p>PipeWire negotiates the format, and my code checks what it actually agreed to provide. This is the same lesson the webcam had already taught me: requesting a configuration is not the same as verifying the result.</p>

        <p>When PipeWire invokes the process callback, I dequeue an available buffer.</p>

        <p>Yes, there is still a dequeue operation. The difference is that it happens inside PipeWire’s callback, rather than inside my own “wait for the next camera frame” loop. <a href="https://docs.pipewire.org/page_tutorial5.html">PipeWire capture tutorial</a></p>

        <p>The callback checks the buffer, copies its image into the pool, and releases it back to PipeWire.</p>

        <pre className="article-code"><code>{"PipeWire buffer\n    → copy into Melquiades slot\n    → publish SlotId\n    → return PipeWire buffer"}</code></pre>

        <div className="sidenote-row">
          <p><a className="sidenote-reference" href="#why-copy-note">Why copy?</a></p>
          <WhyCopyNote />
        </div>

        <p>Because this buffer belongs to the capture system. My sender might still be compressing or sending the image after the callback returns.</p>

        <p>Passing the sender a pointer would not magically transfer ownership of those pixels.</p>

        <p>For this implementation, an independent copy gave me a clear boundary: PipeWire could reuse its buffer, and Melquiades could keep working on its own image.</p>

        <h3>macOS: ScreenCaptureKit</h3>

        <div className="sidenote-row">
          <p>
            On the Mac, I used ScreenCaptureKit through the Rust{' '}
            <a className="sidenote-reference" href="#screencapturekit-crate-note"><code>screencapturekit</code></a> crate.
          </p>
          <ScreenCaptureKitCrateNote />
        </div>

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

        <pre className="article-code"><code>{"ScreenCaptureKit callback\n    → obtain CVPixelBuffer\n    → lock for reading\n    → copy into Melquiades slot\n    → release the lock\n    → return"}</code></pre>

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

        <p>Melquiades could capture screens through two different operating-system APIs and feed those images into a working streaming pipeline.</p>

        <p>Getting the pixels was no longer the problem.</p>

        <p>I now had roughly eight megabytes per frame, arriving repeatedly, and a sender that had to make those bytes practical to move across the network.</p>

        <p>DEFLATE had gotten me this far.</p>

        <p>Next, I needed to understand where it stopped being enough.</p>
      </div>
    </section>
  )
}
