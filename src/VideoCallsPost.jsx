const remainingChapters = [
  ['03', 'The first surprise: “30 fps” was actually 15 fps', 'Measure the physical source before optimizing software.'],
  ['04', 'Bounded ownership, not a growing queue', 'Four slots, SPSC ownership, and dropping stale work.'],
  ['05', 'Screen capture is not one API', 'Portal and PipeWire on Linux; ScreenCaptureKit on macOS.'],
  ['06', 'Why Deflate was useful—and not enough', 'A simple baseline before motion-aware compression.'],
  ['07', 'What H.264 actually changed', 'Access units, NAL units, IDRs, SPS/PPS, and AVCC → Annex B.'],
  ['08', 'A tiny UDP protocol, on purpose', 'The 14-byte JUAN header and the limits of an experimental LAN protocol.'],
  ['09', 'The stream froze', 'How keyframe bursts overflowed a Linux receive buffer.'],
  ['10', 'What the measurements actually say', 'Software timings versus honest glass-to-glass latency.'],
  ['11', 'What is unfinished', 'The boundaries that still own latency.'],
  ['12', 'What comes next', 'Controlled 30/60 fps experiments, high-speed measurement, and BedWars.'],
]

function IrisEvidence() {
  return (
    <div className="sidenote-anchor" id="iris-evidence">
      <aside className="article-sidenote" aria-label="Evidence: standalone videophones">
        <span className="sidenote-type">EVIDENCE</span>
        <img
          className="sidenote-image"
          src="/acn_phone.png"
          alt="ACN IRIS V digital video phone"
        />
        <h3>ACN IRIS V</h3>
        <p>
          A small, self-contained video phone: handset, camera, display, keypad, and an Internet connection in one
          desk-phone-shaped machine.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>EVIDENCE</span> ACN IRIS V</summary>
        <img
          className="sidenote-image"
          src="/acn_phone.png"
          alt="ACN IRIS V digital video phone"
        />
        <p>
          A small, self-contained video phone: handset, camera, display, keypad, and an Internet connection in one
          desk-phone-shaped machine.
        </p>
      </details>
    </div>
  )
}

function FlateNote() {
  return (
    <div className="sidenote-anchor" id="flate2-note">
      <aside className="article-sidenote" aria-label="Under the hood: flate2">
        <span className="sidenote-type">UNDER THE HOOD</span>
        <h3>flate2</h3>
        <p>
          The Rust crate I used for this baseline. It is a DEFLATE-based compression and decompression library with
          support for raw DEFLATE, zlib, and gzip streams.
        </p>
        <a href="https://docs.rs/flate2/latest/flate2/">Read the flate2 docs →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> flate2</summary>
        <p>
          The Rust crate I used for this baseline. It is a DEFLATE-based compression and decompression library with
          support for raw DEFLATE, zlib, and gzip streams.
        </p>
        <a href="https://docs.rs/flate2/latest/flate2/">Read the flate2 docs →</a>
      </details>
    </div>
  )
}

function WebRtcNote() {
  return (
    <div className="sidenote-anchor" id="webrtc-note">
      <aside className="article-sidenote" aria-label="Under the hood: WebRTC">
        <span className="sidenote-type">UNDER THE HOOD</span>
        <h3>WebRTC, since 2011</h3>
        <p>
          Google announced the open WebRTC project on May 3, 2011. It brought its real-time voice and video engine
          work to the web as browser APIs and an open-source project—part of the foundation beneath modern tools such
          as Google Meet.
        </p>
        <a href="https://webrtc.github.io/webrtc-org/blog/2011/05/03/introducing-webrtc-an-open-realtime-communications-project.html">
          Read the announcement →
        </a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> WebRTC, since 2011</summary>
        <p>
          Google announced the open WebRTC project on May 3, 2011. It brought its real-time voice and video engine
          work to the web as browser APIs and an open-source project—part of the foundation beneath modern tools such
          as Google Meet.
        </p>
        <a href="https://webrtc.github.io/webrtc-org/blog/2011/05/03/introducing-webrtc-an-open-realtime-communications-project.html">
          Read the announcement →
        </a>
      </details>
    </div>
  )
}

export default function VideoCallsPost() {
  return (
    <article className="writing-article video-call-post">
      <p className="article-kicker">WRITING</p>
      <h1>How Do Video Calls Work?</h1>
      <p className="article-dek">
        An experiment in understanding the machinery that makes a conversation feel like it is happening now.
      </p>

      <section className="chapter-with-sidenote">
        <div className="chapter-main">
          <h2 className="chapter-title"><span className="chapter-index">01</span><span>The question behind Melquiades</span></h2>
          <p>One of the things I admire most about modern technology is how ubiquitous video calling has become.</p>

          <div className="sidenote-row">
            <p>
              Not that long ago, seeing the person on the other end of a call meant using specialized hardware or a
              dedicated application. I remember standalone videophones such as <a className="sidenote-reference" href="#iris-evidence">ACN&apos;s IRIS devices</a>:
              desk-phone-like machines with a handset, camera, screen, and Internet connection. Then applications
              like Skype made calling someone across the world feel strangely normal.
            </p>
            <IrisEvidence />
          </div>

          <p>Now video calling is everywhere.</p>

          <p>
            It is built into phones, laptops, consoles, and sometimes just a browser tab. You can open Google Meet,
            Discord, FaceTime, WhatsApp, or Zoom, press one button, and suddenly a camera, microphone, encoder,
            network connection, and display pipeline are cooperating closely enough that you can forget they exist.
          </p>

          <p>That is honestly pretty sick.</p>

          <p>But it also made me wonder: how does this actually work?</p>

          <p>
            A call has to feel close to real time. It needs to carry audio and video, survive imperfect networks,
            avoid freezing, avoid showing old frames, and make all of that feel simple enough that nobody thinks
            about it while they are talking.
          </p>

          <p>At a high level, I assumed the video part worked like this:</p>

          <div className="article-flow" aria-label="A simple video-call pipeline">
            <span>camera or screen</span><i aria-hidden="true">→</i><span>capture an image</span>
            <i aria-hidden="true">→</i><span>send it through UDP</span><i aria-hidden="true">→</i><span>display it somewhere else</span>
          </div>

          <p>That is not wrong. It is just incomplete.</p>

          <p>
            The difficult part is everything needed to stop that pipeline from becoming slow, jittery, memory-hungry,
            or visually stale. What happens if the camera creates frames faster than the sender can process them?
            What happens when an H.264 keyframe is split into hundreds of packets and a few vanish? What happens if
            the receiver is busy decoding while more packets keep arriving? And what does “low latency” really mean
            when the camera, operating system, codec, network, compositor, and display all have their own queues?
          </p>

          <p>I wanted to find out.</p>

          <p>
            So I built Melquiades: a deliberately small, experimental streaming system written in Rust. It began
            with a ThinkPad camera sending video to a Mac screen, and later grew into a macOS screen-capture-to-Linux
            H.264 stream.
          </p>

          <p>
            It is not a replacement for Zoom, Discord, or Google Meet. It does not have audio, encryption, NAT
            traversal, congestion control, calls with multiple people, or Internet connectivity. Those are all
            serious problems that mature systems solve.
          </p>

          <p>
            Melquiades is narrower on purpose. I wanted to see the machinery underneath the abstraction: raw frame
            bytes, capture permissions, bounded queues, codecs, packet headers, UDP bursts, decoder recovery, and
            the point where a system stops showing “live video” and starts showing the past.
          </p>

          <h3>Objective</h3>
          <p>The project&apos;s objective is simple:</p>
          <blockquote>Stream a screen or camera image from machine A to machine B while keeping the displayed image recent.</blockquote>

          <div className="article-flow" aria-label="Melquiades processing pipeline">
            <span>source pixels</span><i aria-hidden="true">→</i><span>capture</span><i aria-hidden="true">→</i><span>encode or compress</span>
            <i aria-hidden="true">→</i><span>packetize</span><i aria-hidden="true">→</i><span>send over LAN</span><i aria-hidden="true">→</i>
            <span>reassemble</span><i aria-hidden="true">→</i><span>decode</span><i aria-hidden="true">→</i><span>display</span>
          </div>

          <p>Each arrow hides a decision.</p>

          <p>
            Who owns the frame memory? When should a frame be dropped? How large can a packet be? What happens if
            packets arrive out of order? Can the decoder recover after losing a keyframe? Is the measured time actual
            display latency, or only the time until a graphics API accepts some pixels?
          </p>

          <p>Those questions became the project.</p>

          <h3>Constraints</h3>
          <p>The first experiments used hardware I already had:</p>
          <ul>
            <li>a ThinkPad with a 60 Hz screen and a 30 fps integrated camera;</li>
            <li>a Mac mini with a 100 Hz display;</li>
            <li>a local network connection;</li>
            <li>Rust and operating-system media APIs;</li>
            <li>a preference for recent frames over a growing queue of complete but old ones.</li>
          </ul>

          <p>
            The LAN constraint is important. Sending video across the public Internet is not just changing an IP
            address. Real systems need peer discovery, NAT traversal, relays when direct connections fail,
            encryption, congestion control, and adaptation to networks that change while the call is happening.
          </p>

          <p>That is the territory where WebRTC becomes useful.</p>

          <h3>What about WebRTC?</h3>
          <div className="sidenote-row">
            <p>
              <a className="sidenote-reference" href="#webrtc-note">WebRTC</a> exists because browser-based
              real-time media is difficult. It provides the pieces needed to capture media, negotiate connectivity,
              transport it securely, handle loss, and adapt to network conditions.
            </p>
            <WebRtcNote />
          </div>

          <p>For a real video-call product, I would start there.</p>

          <p>
            But I was interested in seeing what those abstractions protect us from. I wanted to understand why a
            system needs a codec instead of a generic compressor, why video frames need a freshness policy, why a
            missing UDP packet can freeze an otherwise fast stream, and why the kernel&apos;s socket buffer can matter as
            much as the code I wrote.
          </p>

          <p>Melquiades is not an attempt to rebuild WebRTC.</p>
          <p>It is an attempt to earn a better mental model of it.</p>

          <p>The first question was much smaller:</p>
          <blockquote>How do I get one frame from my ThinkPad camera onto my Mac&apos;s screen?</blockquote>
          <p>That is where the experiment started.</p>
        </div>

      </section>

      <section className="chapter-with-sidenote">
        <div className="chapter-main">
          <h2 className="chapter-title"><span className="chapter-index">02</span><span>Pixels Are Much Bigger Than They Look</span></h2>

        <p>When I think of a screenshot, I instinctively think of a few megabytes. Maybe less.</p>

        <p>
          But a screenshot is one image saved once. A video stream is a new image arriving repeatedly, whether the
          rest of the system is ready for it or not.
        </p>

        <p>Take a 1920×1080 screen:</p>
        <div className="article-equation">1920 × 1080 = 2,073,600 pixels</div>

        <p>
          For Melquiades, the screen capture arrives in a BGRA-style format: blue, green, red, and one extra byte
          per pixel. That means four bytes per pixel.
        </p>
        <div className="article-equation">2,073,600 pixels × 4 bytes = 8,294,400 bytes per frame</div>

        <p>One uncompressed 1080p frame is therefore about 7.91 MiB.</p>

        <p>That is already much larger than I expected. Now multiply it by the frame rate:</p>
        <div className="article-equation article-equation-multiline">
          <span>8,294,400 bytes × 30 frames / second</span>
          <span>= 248,832,000 bytes / second</span>
          <span>≈ 1.99 Gb/s</span>
        </div>

        <p>
          That is nearly two gigabits per second of raw pixel data, before UDP headers, before Wi-Fi overhead, and
          before any other program on the network gets a chance to exist.
        </p>

        <p>At 60 fps, the raw rate would be almost four gigabits per second.</p>

        <p>
          My Mac display runs at 100 Hz, but that does not mean Melquiades automatically produces 100 frames each
          second. The current H.264 experiment intentionally captures at 30 fps. Display refresh rate, capture rate,
          encoder throughput, and network throughput are related, but they are not the same thing.
        </p>

        <p>So raw pixels were not going to work.</p>

          <h3>The first attempt: generic compression</h3>
          <div className="sidenote-row">
            <p>
              My first baseline used <a className="sidenote-reference" href="#flate2-note">fast DEFLATE compression</a>.
              DEFLATE is a good general-purpose compressor, and it was useful because it let me measure the tradeoff
              before introducing a real video codec.
            </p>
            <FlateNote />
          </div>

        <p>
          On the original 640×480 camera stream, a raw YUYV frame was 614,400 bytes. Fast DEFLATE reduced it, but
          compression still took roughly 8–9 milliseconds per frame in representative runs.
        </p>

        <p>Eight milliseconds does not sound huge. At 30 fps, though, one frame period is only:</p>
        <div className="article-equation">1 second / 30 frames = 33.33 ms per frame</div>

        <p>Compression was using roughly a quarter of that budget.</p>

        <p>
          That does not mean I should multiply eight milliseconds by thirty and call the result “latency.” A pipeline
          can overlap work: while one frame is being compressed, the camera may be preparing another. The important
          question is whether every stage can keep up with the rate of incoming frames.
        </p>

        <p>
          If compression takes longer than the available frame budget, or if it delays the sender enough for frames
          to queue behind it, the stream starts aging. Then the user is not seeing the newest camera or screen image
          anymore. They are seeing a backlog.
        </p>

        <p>
          The compression ratio also changed dramatically with content. A mostly static desktop can compress
          extremely well. Moving windows, games, video, and camera noise give the compressor less repeated data to
          exploit. There is no single honest “this reduces video by 40%” number.
        </p>

        <h3>Why video needs a video codec</h3>
        <p>
          DEFLATE understands repeated bytes inside one frame. It does not understand that the next frame is usually
          very similar to the previous one.
        </p>

        <p>A video codec such as H.264 does.</p>

        <p>
          Instead of independently compressing every full image, H.264 can encode a frame relative to earlier
          frames. If only a small part of the screen changes, it can often send information about that change instead
          of another complete 8 MB image.
        </p>

        <p>That is why H.264 is the right next experiment for Melquiades.</p>

        <p>
          It is not free. It adds encoder delay, decoder delay, predictive-frame dependencies, keyframes, and harder
          loss recovery. But it changes the problem from “how do I move raw screenshots quickly?” into “how do I
          send only the visual information that changed, while keeping the stream responsive?”
        </p>

          <p>That distinction is where video streaming becomes interesting.</p>
        </div>
      </section>

      <section className="article-outline" aria-label="Remaining chapter outline">
        <p className="outline-label">STILL TO WRITE</p>
        <ol>
          {remainingChapters.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  )
}
