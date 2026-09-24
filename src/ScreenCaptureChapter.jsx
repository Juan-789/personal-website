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
        <img className="sidenote-image sidenote-image-wide" src="/portal-steam-header.jpg" alt="Portal title image from Steam" />
        <h3>ashpd, a Portal reference</h3>
        <p>
          <code>ashpd</code> is a Rust wrapper around the XDG Desktop Portal D-Bus interfaces.
        </p>
        <a href="https://docs.rs/ashpd/0.13.13/ashpd/">Read the ashpd docs →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> ashpd, a Portal reference</summary>
        <img className="sidenote-image sidenote-image-wide" src="/portal-steam-header.jpg" alt="Portal title image from Steam" />
        <p>
          <code>ashpd</code> is a Rust wrapper around the XDG Desktop Portal D-Bus interfaces.
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
        <p>My camera worked at 30 FPS, but I had no tangible latency number to brag about this project, I mean I
           had timestamps for the individual stages. I knew how long I waited for a camera frame, how 
           long compression took, and how long the sender spent submitting UDP packets. </p>
        <p>But these are all things that are minuscule, like unless you are an engineer deep into this, you don't have a point of reference and don't know whether these numbers are good or bad.
          What we can all comprehend is how long what happens in A takes to get shown in Screen of B (informal definition of glass-to-glass),
           and with that we have at least a common point of reference</p>
        <blockquote>So what is my glass-to-glass?</blockquote>
        <p>Well I had thought of many ways to measure it, but the setup was slightly weird and overly engineered for my liking,</p>
        <p>Thus I implemented Screen sharing, Screen sharing gave me a convenient experiment. Put a changing timer on one screen, stream it to the other computer, and compare the original with the received image. The actual measurement has some complications, which I will get into later, but at least I would have something visible to compare and much simpler than the above.</p>

        <p>Plus, It also gave me another source to play with.</p>
        <h3>Idea</h3>
        <p>My ThinkPad’s screen runs at 60 Hz. The monitor connected to my Mac mini runs at 100 Hz. After fighting to get a real 30 FPS from the webcam, screen capture gave me a chance to experiment with a faster source.</p>

        <p>But first, I need to get the pixels.</p>

        <p>Which sound easy enough.</p>

        <h3>Who asks for the next frame?</h3>

        <p>My camera implementation had a fairly straightforward shape:</p>

        <pre className="article-code"><code>{"claim a free slot\n    → wait for a camera frame\n    → copy it into the slot\n    → publish the slot\n    → repeat"}</code></pre>

        <p>Melquiades owned that loop. Its <code>FrameSource</code> interface exposed a <code>next_frame()</code> method, which waited for V4L2 to provide a completed camera buffer. Once it returned, my code processed the frame and called it again.</p>

        <p>Screen capture gave my code a different shape.</p>

        <p>In my PipeWire and ScreenCaptureKit backends, I registered a handler and started the stream. The capture system then called my handler whenever there was output to process.</p>

        <p>With the camera, my code called a function to obtain the next frame. With screen capture, the capture system called my code to handle incoming output.</p>


        <pre className="article-code"><code>{"capture system invokes my callback\n    → inspect the supplied image\n    → copy it into a free pool slot\n    → publish the slot\n    → return"}</code></pre>

        <p>Now the question isn't “how do I fetch the next frame?”, but rather:</p>

        <blockquote><p>A frame has arrived. Where can I put it before returning control?</p></blockquote>

        <p>Conveniently, the previous chapter had already given me somewhere to put it.</p>

        <p>The frame pool still worked. I added a <code>publish_strided()</code> operation so a callback could copy an externally supplied image into a free slot and publish it to the sender.</p>

        <p>The platform-specific part was everything that happened before that handoff.</p>

        <h3>Linux: permission then pixels</h3>
        <p>The usual UI/UX for sharing your screen is pretty standard accross different apps, so I wondered if that is something that I'll need to implement or comes done for me?</p>
        <p>Turns out the whole permission thing is already part of Linux, (makes sense why they all look the same); but the reason is more technical than I expected and is that
          on a modern Wayland desktop, applications are deliberately prevented from 
          simply reading each other's pixels, so screen capture has to cross this compositor-controlled boundary in order to share a whole screen.</p>


        <div className="sidenote-row">
          <p>
            The standard way to ask for that access is through the XDG ScreenCast portal which Rust has a crate
            binding for it called Ashpd, or better known as{' '}
            <a className="sidenote-reference" href="#ashpd-note">Aperture Science Handheld Portal Device</a>.
          </p>
          <AshpdNote />
        </div>
        <blockquote><p> Yayyyy! We have permission, but how do I get the pixels for my program?</p></blockquote>

        <p>Turns out I need to use <b>ANOTHER</b> library for that, and that's where Pipewire comes in.</p>

        <p>PipeWire is Linux's multimedia framework for moving audio and video between producers and consumers. In my case, the compositor exposes the shared screen as a video source, and PipeWire is what actually delivers those frame buffers to Melquiades.</p>
        {/* <div className="sidenote-row">
          <p>
            my screen-capture path used the <a className="sidenote-reference" href="#xdg-screencast-note">XDG ScreenCast portal</a>{' '}
            and <a className="sidenote-reference" href="#pipewire-note">PipeWire</a>.
          </p>
          <XdgScreenCastNote />
          <PipeWireNote />
        </div> */}
        <p>In essence the portal handles the request to share something. PipeWire delivers the resulting video stream.</p>
        <p>The whole pipeline then looks like</p>

        <pre className="article-code"><code>{"Melquiades\n    → request screen sharing through the portal\n    → user selects a monitor\n    → receive an authorized PipeWire connection\n    → receive frame buffers through PipeWire"}</code></pre>

        <p>I used <code>ashpd</code> to talk to the portal from Rust. It wraps the portal&apos;s D-Bus interfaces.</p>

        {/* <p>This is pretty cool but as you may have seen am slightly more interested into what is below this abstraction layer, and for that certain things must be answered</p> */}


        {/* <div className="sidenote-row">
          <p>
            Underneath, <code>ashpd</code> uses <a className="sidenote-reference" href="#zbus-note"><code>zbus</code></a>{' '}
            for that D-Bus conversation.
          </p>
          <ZbusNote />
        </div> */}
        <p>My screen sharing request was deliberately narrow: one monitor, include cursor, and no persistant permission </p>


        <p>The code creates a session, selects those source options, and starts the request.</p>

        <p>Once the user has selected a monitor, the response identifies its PipeWire stream. I then ask the portal for a file descriptor representing an authorized PipeWire connection.</p>

        <p>The stream’s node ID tells me which source to connect to. The file descriptor gives me the connection through which I can access it. Neither one is an image yet. <a href="https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.ScreenCast.html">ScreenCast portal specification</a></p>

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

        <p>Yup, there is still a dequeue operation. The difference is that it happens inside PipeWire’s callback, rather than inside my own “wait for the next camera frame” loop. <a href="https://docs.pipewire.org/page_tutorial5.html">PipeWire capture tutorial</a></p>

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

        <p>The setup looked slightly different:</p>

        <pre className="article-code"><code>{"query shareable content\n    → choose a display\n    → configure the output\n    → register a handler\n    → start capture"}</code></pre>

        <p>My initial implementation selects the first returned display and requests:</p>

        <pre className="article-code"><code>{"1920 × 1080\nBGRA pixels\n30 FPS"}</code></pre>

        <p>When output arrives, ScreenCaptureKit invokes <code>did_output_sample_buffer()</code>.</p>

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

        <p>Different setup. But I get to keep the ownership model.</p>

        <p>How do I keep this image available to my sender without holding up the capture system?</p>


        <p>There was one more platform detail hidden inside “copy the image”: the source rows were not guaranteed to be tightly packed. Capture buffers can have a larger stride than width × bytes_per_pixel, so a flat memcpy could accidentally copy row padding into the image.
I handled that at the platform boundary with publish_strided(), which copies row by row into Melquiades' tightly packed frame layout. After that, the rest of the pipeline does not need to know how PipeWire or Core Video arranged the original buffer. </p>
        <p>Both platform backends use this operation.</p>

        <p>After that copy, every downstream stage sees the same tightly packed layout. It does not need to know how PipeWire or Core Video arranged the original rows.</p>

        <h3>The pool still does its job</h3>

        <p>This was where the previous chapter’s work paid off.</p>

        <p>I did not need a new ownership scheme for every operating system.</p>

        <p>Once a screen frame reached the pool, the lifecycle remained:</p>

        <pre className="article-code"><code>{"Free\n    → capture owns it\n    → Ready\n    → sender owns it\n    → Free"}</code></pre>

        <p>If no slot was available, the callback dropped the incoming frame.</p>

        <p>It did not wait for compression. It did not wait for UDP. The sender could still discard stale ready frames and keep the newest one.</p>

        <p>The pool was larger now. Four 1080p BGRA slots occupy about 33.2 MB, compared with roughly 2.46 MB for the original camera frames. But the number of outstanding raw frames stayed bounded.</p>

        <p>That does not eliminate every queue in the operating system. It bounds the particular handoff I control.</p>

        <p>There was also a measurement trap here.</p>

        <p>For the camera, my capture timestamp began before waiting for a frame. For screen capture, it began inside the callback, after the capture system had already done work.</p>

        <p>A smaller capture interval did not prove that screen capture was magically faster. The two measurements started at different events.</p>

        <p>Apparently, every chapter of this project needed another opportunity to distrust a timestamp.</p>

        <h3>A different path later</h3>

        <p>Later, the Mac H.264 would bypass this raw-frame copy entirely:</p>

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
