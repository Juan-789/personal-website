const remainingChapters = [
  ['04', 'Live Video Is a Queueing Problem', 'Four slots, SPSC ownership, bounded memory, freshness over completeness.'],
  ['05', 'Screen Capture Is Not One API', 'Linux portal + PipeWire; macOS ScreenCaptureKit and IOSurfaces.'],
  ['06', 'Why Deflate Was Useful, but Not Enough', 'A measurable independent-frame baseline before real video coding.'],
  ['07', 'What H.264 Actually Changed', 'Access units, IDRs, SPS/PPS, AVCC → Annex B, decoder recovery.'],
  ['08', 'A Tiny UDP Protocol, Deliberately', 'JUAN’s 14-byte header and why it is not WebRTC or RTP.'],
  ['09', 'The Stream Froze', 'Keyframe bursts, socket-buffer overflow, ss, nstat, and the fix.'],
  ['10', 'What the Measurements Actually Say', 'Local timing segments, informal glass-to-glass results, and unknowns.'],
  ['11', 'What Is Still Unfinished', 'Software decode, one receiver thread, CPU copies, no Internet transport.'],
  ['12', 'What Comes Next', 'Controlled 30/60 fps tests, high-speed-camera measurement, VA-API, then the BedWars remote-play demo.'],
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
          work to the web as browser APIs and an open-source project, part of the foundation beneath modern tools such
          as Google Meet.
        </p>
        <a href="https://webrtc.github.io/webrtc-org/blog/2011/05/03/introducing-webrtc-an-open-realtime-communications-project.html">
          Read the announcement →
        </a>
        <a href="https://www.youtube.com/watch?v=p2HzZkd2A40">Watch the Google I/O 2013 demo →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> WebRTC, since 2011</summary>
        <p>
          Google announced the open WebRTC project on May 3, 2011. It brought its real-time voice and video engine
          work to the web as browser APIs and an open-source project, part of the foundation beneath modern tools such
          as Google Meet.
        </p>
        <a href="https://webrtc.github.io/webrtc-org/blog/2011/05/03/introducing-webrtc-an-open-realtime-communications-project.html">
          Read the announcement →
        </a>
        <a href="https://www.youtube.com/watch?v=p2HzZkd2A40">Watch the Google I/O 2013 demo →</a>
      </details>
    </div>
  )
}

function H264ReadingNote() {
  return (
    <div className="sidenote-anchor" id="h264-reading">
      <aside className="article-sidenote" aria-label="Further reading: what H.264 is actually doing">
        <span className="sidenote-type">FURTHER READING</span>
        <h3>What H.264 is actually doing</h3>
        <p>
          This chapter only explains why Melquiades needs a video codec. H.264 itself goes much deeper: colour-space
          conversion, block-based prediction, motion estimation, transforms, quantization, entropy coding,
          keyframes, NAL units, and packetization.
        </p>
        <p>
          Sam Considine&apos;s <a href="https://samconsidine.com/posts/h264-encoding/">The H.264 Encoding and WebRTC Stack</a>
          {' '}is an excellent visual explanation of that full path. A later chapter here will focus on VideoToolbox
          output, AVCC versus Annex B, SPS/PPS, IDR recovery, and sending complete access units over UDP.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>FURTHER READING</span> What H.264 is actually doing</summary>
        <p>
          This chapter only explains why Melquiades needs a video codec. H.264 itself goes much deeper: colour-space
          conversion, block-based prediction, motion estimation, transforms, quantization, entropy coding,
          keyframes, NAL units, and packetization.
        </p>
        <p>
          Sam Considine&apos;s <a href="https://samconsidine.com/posts/h264-encoding/">The H.264 Encoding and WebRTC Stack</a>
          {' '}is an excellent visual explanation of that full path. A later chapter here will focus on VideoToolbox
          output, AVCC versus Annex B, SPS/PPS, IDR recovery, and sending complete access units over UDP.
        </p>
      </details>
    </div>
  )
}

function RealTimeNote() {
  return (
    <div className="sidenote-anchor sidenote-left" id="real-time-note">
      <aside className="article-sidenote" aria-label="Detour: what is real time">
        <span className="sidenote-type">DETOUR</span>
        <h3>What is real time?</h3>
        <p>
          The useful number is not a packet&apos;s travel time. It is how long it takes from when you speak to when the
          other person hears you: mouth to ear. Around 150–300 ms end to end is the rough range where voice calls
          still feel natural; beyond that, people begin to pause, interrupt, and talk over each other.
        </p>
        <p>
          Video has a second version of the same question: from something happening in front of one camera to the
          other person seeing it on their screen. Around 200 ms glass-to-glass is a reasonable place to aim. My
          informal Google Meet test landed around there. The last chapter gets into the funny way I measured that.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> What is real time?</summary>
        <p>
          The useful number is not a packet&apos;s travel time. It is how long it takes from when you speak to when the
          other person hears you: mouth to ear. Around 150–300 ms end to end is the rough range where voice calls
          still feel natural; beyond that, people begin to pause, interrupt, and talk over each other.
        </p>
        <p>
          Video has a second version of the same question: from something happening in front of one camera to the
          other person seeing it on their screen. Around 200 ms glass-to-glass is a reasonable place to aim. My
          informal Google Meet test landed around there. The last chapter gets into the funny way I measured that.
        </p>
      </details>
    </div>
  )
}

function V4L2Note() {
  return (
    <div className="sidenote-anchor sidenote-left" id="v4l2-note">
      <aside className="article-sidenote" aria-label="Under the hood: V4L2">
        <span className="sidenote-type">UNDER THE HOOD</span>
        <h3>V4L2</h3>
        <p>
          The Linux media userspace API documentation is a thick one. I did not read all of it. I mostly read the
          Rust <a href="https://crates.io/crates/linuxvideo">linuxvideo</a> crate, which abstracts a lot of V4L2.
        </p>
        <p>
          It was still cool to see what sits underneath: finding a device, picking a pixel format, requesting a
          stream, and reading its frames. The kernel docs are the deeper rabbit hole if you want to see that layer.
        </p>
        <a href="https://kernel.org/doc/html/latest/userspace-api/media/index.html">Open the Linux media API docs →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>UNDER THE HOOD</span> V4L2</summary>
        <p>
          The Linux media userspace API documentation is a thick one. I did not read all of it. I mostly read the
          Rust <a href="https://crates.io/crates/linuxvideo">linuxvideo</a> crate, which abstracts a lot of V4L2.
        </p>
        <p>
          It was still cool to see what sits underneath: finding a device, picking a pixel format, requesting a
          stream, and reading its frames. The kernel docs are the deeper rabbit hole if you want to see that layer.
        </p>
        <a href="https://kernel.org/doc/html/latest/userspace-api/media/index.html">Open the Linux media API docs →</a>
      </details>
    </div>
  )
}

function PowerLineNote() {
  return (
    <div className="sidenote-anchor" id="power-line-note">
      <aside className="article-sidenote" aria-label="Detour: power-line frequency and anti-flicker">
        <span className="sidenote-type">DETOUR</span>
        <h3>Why 60 Hz matters</h3>
        <p>
          Changing <code>power_line_frequency</code> from 50 Hz to 60 Hz told the camera&apos;s auto-exposure and
          anti-flicker logic what kind of indoor lighting it was under. In Toronto, mains power is 60 Hz. Indoor
          lights can flicker in sync with it, often effectively at 120 Hz because both halves of the AC cycle produce
          light.
        </p>
        <p>The camera can choose exposure times that fit that rhythm:</p>
        <pre className="sidenote-code"><code>{`60 Hz: 1/120 s = 8.33 ms
       1/60 s  = 16.67 ms
       1/30 s  = 33.33 ms

50 Hz: 1/100 s = 10 ms
       1/50 s  = 20 ms
       1/25 s  = 40 ms`}</code></pre>
        <p>
          Using 50 Hz logic under 60 Hz lighting can cause brightness pulsing, horizontal banding, or unstable
          automatic exposure. Dynamic frame rate preserved the 30 FPS cadence; the 60 Hz setting made anti-flicker
          decisions match the room.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> Why 60 Hz matters</summary>
        <p>
          Changing <code>power_line_frequency</code> from 50 Hz to 60 Hz told the camera&apos;s auto-exposure and
          anti-flicker logic what kind of indoor lighting it was under. In Toronto, mains power is 60 Hz. Indoor
          lights can flicker in sync with it, often effectively at 120 Hz because both halves of the AC cycle produce
          light.
        </p>
        <p>The camera can choose exposure times that fit that rhythm:</p>
        <pre className="sidenote-code"><code>{`60 Hz: 1/120 s = 8.33 ms
       1/60 s  = 16.67 ms
       1/30 s  = 33.33 ms

50 Hz: 1/100 s = 10 ms
       1/50 s  = 20 ms
       1/25 s  = 40 ms`}</code></pre>
        <p>
          Using 50 Hz logic under 60 Hz lighting can cause brightness pulsing, horizontal banding, or unstable
          automatic exposure. Dynamic frame rate preserved the 30 FPS cadence; the 60 Hz setting made anti-flicker
          decisions match the room.
        </p>
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
          <h2 className="chapter-title"><span className="chapter-index">01</span><span>How Do Video Calls Work?</span></h2>
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

          <div className="sidenote-row">
            <p>
              A call has to feel close to <a className="sidenote-reference" href="#real-time-note">real time</a>.
              It needs to carry audio and video, survive imperfect networks, avoid freezing, avoid showing old
              frames, and make all of that feel simple enough that nobody thinks about it while they are talking.
            </p>
            <RealTimeNote />
          </div>

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
            <li>ThinkPad with a 60 Hz screen and a 30 fps integrated camera;</li>
            <li>Mac mini with a 100 Hz display;</li>
            <li>local network connection;</li>
            <li>Rust and operating-system media APIs;</li>
            <li>preference for recent frames over a growing queue of complete but old ones.</li>
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

        <div className="sidenote-row">
          <p>That is why <a className="sidenote-reference" href="#h264-reading">H.264</a> is the right next experiment for Melquiades.</p>
          <H264ReadingNote />
        </div>

        <p>
          It is not free. It adds encoder delay, decoder delay, predictive-frame dependencies, keyframes, and harder
          loss recovery. But it changes the problem from “how do I move raw screenshots quickly?” into “how do I
          send only the visual information that changed, while keeping the stream responsive?”
        </p>

        <p>That distinction is where video streaming becomes interesting.</p>
        </div>
      </section>

      <section className="chapter-with-sidenote">
        <div className="chapter-main">
          {/* Previous draft retained temporarily while this chapter is being revised. */}
          {/*
          <h2 className="chapter-title"><span className="chapter-index">03</span><span>The First Surprise: “30 FPS” Was Actually 15 FPS</span></h2>

          <p>
            As usual, before I got to optimize anything cool, I first had to figure out why the thing I thought I had
            configured was lowkey not doing what I had configured it to do.
          </p>

          <p>The first version of Melquíades used the built-in ThinkPad camera: 640×480, YUYV, supposedly 30 FPS.</p>

          <p>And 30 FPS should mean that a new frame comes in every:</p>
          <div className="article-equation">1 / 30 = 0.0333 seconds = 33.3 ms</div>

          <p>
            This matters because, even if every other part of my program were instant, I cannot show a newer image
            until the camera has actually made one. But while measuring the pipeline, I noticed something was off. It
            felt more like 15 FPS.
          </p>

          <p>At 15 FPS:</p>
          <div className="article-equation">1 / 15 = 0.0667 seconds = 66.7 ms</div>

          <p>
            So instead of a new chance to observe the world every 33 ms, I was getting one every 66 ms. That is
            already a massive amount of time if the eventual objective is a live, low-latency video stream.
          </p>

          <p>
            Before I had compressed a frame, sent a UDP packet, decoded anything, or rendered a pixel, the camera
            itself was already eating a meaningful part of the latency budget.
          </p>

          <h3>Okay, but was Melquíades actually the problem?</h3>
          <p>The first thing I wanted to know was whether my program was somehow messing this up.</p>

          <div className="sidenote-row">
            <p>
              On Linux, cameras are usually exposed through <a className="sidenote-reference" href="#v4l2-note">V4L2</a>,
              or Video4Linux2. It is a kernel API that lets programs inspect a camera, choose a format, request a
              frame rate, set camera controls, queue buffers, and eventually receive captured frames.
            </p>
            <V4L2Note />
          </div>

          <p>Melquíades used the Rust <code>linuxvideo</code> crate, but I also checked the device directly with <code>v4l2-ctl</code>:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 --get-fmt-video
v4l2-ctl -d /dev/video0 --get-parm`}</code></pre>

          <p>The camera said it was configured correctly:</p>
          <pre className="article-code"><code>{`Format Video Capture:
        Width/Height      : 640/480
        Pixel Format      : 'YUYV' (YUYV 4:2:2)
        Field             : None
        Bytes per Line    : 1280
        Size Image        : 614400
        Colorspace        : sRGB
        Transfer Function : Rec. 709
        YCbCr/HSV Encoding: ITU-R 601
        Quantization      : Default (maps to Limited Range)

Streaming Parameters Video Capture:
        Capabilities     : timeperframe
        Frames per second: 30.000 (30/1)
        Read buffers     : 0`}</code></pre>

          <p>This is useful, but it also taught me a distinction I had not fully appreciated yet.</p>
          <blockquote>“Configured for 30 FPS” does not necessarily mean “actually delivering 30 fresh frames every second.”</blockquote>
          <p>It only means that the driver and camera negotiated a mode with a nominal 30 FPS rate.</p>

          <p>So I tested the camera outside Melquíades entirely:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 \\
  --set-fmt-video=width=640,height=480,pixelformat=MJPG \\
  --set-parm=30 \\
  --stream-mmap=4 \\
  --stream-count=300 \\
  --stream-to=/dev/null`}</code></pre>

          <p>
            This requested 30 FPS and streamed camera buffers directly to <code>/dev/null</code>. No Rust code, no
            DEFLATE, no UDP, no display code, none of my own pipeline.
          </p>

          <p>The result was kind of insane:</p>
          <pre className="article-code"><code>{`Frame rate set to 30.000 fps
<<<<<<<<<<<<<<<< 15.21 fps, dropped buffers: 1
<<<<<<<<<<<<<<< 15.17 fps
<<<<<<<<<<<<<<< 15.17 fps
<<<<<<<<<<<<<<< 15.16 fps
<<<<<<<<<<<<<<< 15.16 fps
...`}</code></pre>

          <p>So there it was. The camera was configured for 30 FPS, but it was independently delivering about 15.16 FPS.</p>
          <p>My program was innocent.</p>

          <h3>The camera was allowed to lower its own frame rate</h3>
          <p>Next, I looked at the controls the camera exposed:</p>
          <pre className="article-code"><code>v4l2-ctl -d /dev/video0 --list-ctrls-menus</code></pre>

          <p>The interesting part was this:</p>
          <pre className="article-code"><code>{`auto_exposure 0x009a0901 (menu)
    value=3 (Aperture Priority Mode)

exposure_time_absolute 0x009a0902 (int)
    default=156 value=156 flags=inactive

exposure_dynamic_framerate 0x009a0903 (bool)
    default=0 value=1`}</code></pre>

          <p>
            At first, Aperture Priority Mode sounded kind of weird because this is a tiny laptop webcam, not some
            DSLR with an actual adjustable aperture. But basically, the camera was in an automatic exposure mode. It
            was allowed to decide how long the sensor should collect light for.
          </p>

          <p>
            A camera needs light to make an image. In a darker room, it can leave the sensor exposed for longer,
            collect more photons, and make the image brighter and less noisy.
          </p>

          <p>The problem is that light takes time to collect.</p>

          <p>At 30 FPS, the camera has approximately 33.3 ms per frame period:</p>
          <div className="article-timeline" aria-label="Thirty frames per second frame cadence">
            <span>frame 0</span><i aria-hidden="true" /><span>frame 1</span><i aria-hidden="true" /><span>frame 2</span>
            <small>33.3 ms</small><small>33.3 ms</small>
          </div>

          <p>But <code>exposure_dynamic_framerate = 1</code> gave the camera another option:</p>
          <blockquote>If I want a longer exposure, I am allowed to lower the effective frame rate.</blockquote>

          <p>So instead of maintaining a stable 30 FPS and accepting a darker or noisier image, the camera was effectively choosing something closer to:</p>
          <div className="article-timeline article-timeline-slow" aria-label="Fifteen frames per second frame cadence">
            <span>frame 0</span><i aria-hidden="true" /><span>frame 1</span>
            <small>66.7 ms</small>
          </div>

          <p>
            That is why V4L2 could report a nominal 30 FPS mode while the stream test showed approximately 15 FPS.
            Auto exposure was not inherently bad. It was doing something sensible for a regular video-call camera:
            prefer a usable image over a strict capture cadence.
          </p>

          <p>
            But Melquíades is not trying to make the prettiest webcam image possible. It is trying to understand and
            reduce latency. Those are different objectives.
          </p>

          <h3>Fixing it</h3>
          <p>I changed two settings:</p>
          <pre className="article-code"><code>{`exposure_dynamic_framerate = 0
power_line_frequency = 60 Hz`}</code></pre>

          <p>
            Toronto uses 60 Hz power, not 50 Hz. My camera had initially been configured for 50 Hz:
            <code> power_line_frequency: value=1 (50 Hz)</code>.
          </p>

          <p>The values from the control menu were:</p>
          <pre className="article-code"><code>{`0: Disabled
1: 50 Hz
2: 60 Hz`}</code></pre>

          <p>So I changed both settings with:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 \\
  --set-ctrl=exposure_dynamic_framerate=0,power_line_frequency=2`}</code></pre>

          <p>Then I verified them:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 \\
  --get-ctrl=exposure_dynamic_framerate,power_line_frequency`}</code></pre>

          <div className="sidenote-row">
            <p>
              <a className="sidenote-reference" href="#power-line-note"><code>power_line_frequency</code></a> helps
              the camera choose exposure timings that do not fight against the flicker of indoor lighting. The more
              important setting for latency was <code>exposure_dynamic_framerate = 0</code>.
            </p>
            <PowerLineNote />
          </div>

          <p>
            Disabling dynamic frame rate restored the camera&apos;s 30 FPS cadence. I also corrected the power-line setting
            to 60 Hz so the camera&apos;s anti-flicker logic matched the local lighting and would not become another source
            of unstable exposure behavior.
          </p>

          <p>
            Once that setting changed, the stream ran the way I expected it to. Before measuring every other stage,
            it is worth checking the environment first. Some things are outside my control, but the policies I can
            control need to be explicit, and I need to squeeze the most out of them.
          </p>

          <p>
            Obviously, I did not discover a way to make the sensor gather more photons for free. There is still a
            tradeoff. In darker lighting, forcing a stable frame rate can mean a darker image or more noise.
          </p>

          <p>
            But for this experiment, I preferred a stable capture cadence. I wanted to know that when I said “30 FPS,”
            I was actually getting a new frame every roughly 33 ms.
          </p>

          <h3>What I learned</h3>
          <p>This was probably the first real systems lesson of Melquíades:</p>
          <blockquote>Before optimizing the software, make sure the physical source is doing what you think it is doing.</blockquote>

          <p>
            I could have spent hours profiling Rust, changing queue structures, optimizing syscalls, rewriting the
            UDP sender, or blaming the Linux camera stack. None of that would have recovered frames the camera had
            decided not to produce.
          </p>

          <p>The problem was not in my networking code. It was not in my compression code. It was not even in my program. It was a camera policy.</p>

          <p>
            Once the camera was actually producing 30 frames per second, the next problem became much more
            interesting: what happens when fresh frames arrive correctly, but the next stage cannot process them fast
            enough?
          </p>

          <p>That is where Melquíades becomes a queueing problem.</p>
          */}

          <h2 className="chapter-title"><span className="chapter-index">03</span><span>The First Surprise: “30 FPS” Was Actually 15 FPS</span></h2>

          <p>The first camera version of Melquíades technically worked.</p>

          <p>
            My ThinkPad camera was sending video. The Mac was receiving it. Pixels were moving through UDP and
            showing up on another screen.
          </p>

          <p>But it looked kind of bad.</p>

          <p>
            Not necessarily broken, just delayed and choppy enough that I could tell something was off. The obvious
            thing to do would have been to immediately blame my Rust code: maybe compression was slow, maybe UDP was
            dropping packets, maybe I was copying too much memory, maybe the Mac display code was behind.
          </p>

          <p>But I did not actually know.</p>
          <p>So instead of optimizing random things, I started adding timestamps.</p>

          <h3>The first numbers were not good enough</h3>
          <p>My first attempt at latency measurement was honestly too naive.</p>

          <p>
            The receiver would echo a frame timestamp back to the sender, and I divided that round-trip time by two.
            That gave me an early number around 13 ms.
          </p>

          <p>It was tempting to look at that and think:</p>
          <blockquote>Nice. Camera video across two computers in 13 ms.</blockquote>

          <p>
            But that number was not actually camera-to-screen latency. It included some sender-side work, network
            travel in both directions, receiver work up to the echo, and then assumed the forward and reverse network
            paths were symmetrical. It said nothing useful about when the frame had actually appeared on the Mac
            display.
          </p>

          <p>The video still looked delayed, so the number clearly was not telling the whole story.</p>
          <p>This became my first lesson in performance measurement:</p>
          <blockquote>A timestamp is not automatically a useful measurement. You need to know exactly what event it represents.</blockquote>

          <p>So I threw away the misleading “one number for latency” idea and split the pipeline into stages.</p>
          <pre className="article-code"><code>{`C0 → C1    wait for a camera frame
C1 → S2    prepare the frame
S2 → S3    compress it
S3 → S4    packetize it and submit the first UDP packet
S4 → S5    submit the remaining UDP packets

R0 → R1    receive the first through final packet
T0 → T4    decode, convert, and present on the receiver`}</code></pre>

          <p>Now, instead of asking “what is the latency?”, I could ask: where is the time actually going?</p>

          <h3>Something was wrong before my program even started working</h3>
          <p>The first stage was the one that made me suspicious:</p>
          <div className="article-equation">C0 → C1 = wait for next camera frame</div>

          <p>
            This was the time spent waiting for the camera to give my program a completed frame. The camera was
            configured for 30 FPS. At 30 FPS, one frame period should be:
          </p>
          <div className="article-equation">1 / 30 = 33.33 ms</div>

          <p>But the video felt closer to half that rate.</p>
          <p>At that point, I wanted to separate two possibilities:</p>
          <ol className="article-numbered-list">
            <li>Melquíades is accidentally processing only every second frame.</li>
            <li>The camera itself is only delivering around 15 frames per second.</li>
          </ol>

          <p>So I stopped looking at my own application and asked Linux to test the camera directly.</p>

          <h3>Asking V4L2 instead of guessing</h3>
          <div className="sidenote-row">
            <p>
              On Linux, the camera appears through <a className="sidenote-reference" href="#v4l2-note">V4L2</a>, or
              Video4Linux2. It is the kernel interface applications use to configure cameras and receive video
              buffers.
            </p>
            <V4L2Note />
          </div>

          <p>First, I checked what the camera said it was configured to do:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 --get-fmt-video
v4l2-ctl -d /dev/video0 --get-parm`}</code></pre>

          <p>The result looked completely normal:</p>
          <pre className="article-code"><code>{`Format Video Capture:
        Width/Height      : 640/480
        Pixel Format      : 'YUYV' (YUYV 4:2:2)
        Bytes per Line    : 1280
        Size Image        : 614400

Streaming Parameters Video Capture:
        Frames per second: 30.000 (30/1)`}</code></pre>

          <p>So the driver had negotiated exactly what I had asked for:</p>
          <div className="article-equation article-equation-multiline">
            <span>640 × 480</span><span>YUYV</span><span>30 FPS</span>
          </div>

          <p>
            But that only described the requested mode. It did not prove that the camera was actually producing 30
            new images every second.
          </p>

          <p>To test the real delivery rate outside of Melquíades, I streamed directly from the camera into <code>/dev/null</code>:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 \\
  --set-fmt-video=width=640,height=480,pixelformat=MJPG \\
  --set-parm=30 \\
  --stream-mmap=4 \\
  --stream-count=300 \\
  --stream-to=/dev/null`}</code></pre>

          <p>This test bypassed my Rust code, compression, packetization, UDP, and rendering.</p>
          <p>V4L2 accepted the 30 FPS request:</p>
          <pre className="article-code"><code>Frame rate set to 30.000 fps</code></pre>
          <p>Then it reported what was actually arriving:</p>
          <pre className="article-code"><code>{`15.21 fps, dropped buffers: 1
15.17 fps
15.16 fps
15.16 fps
...`}</code></pre>

          <p>There it was. The problem was not Melquíades skipping every other frame. The camera itself was delivering roughly 15 FPS.</p>

          <h3>The camera was allowed to lower its own frame rate</h3>
          <p>I then inspected the controls exposed by the webcam:</p>
          <pre className="article-code"><code>v4l2-ctl -d /dev/video0 --list-ctrls-menus</code></pre>

          <p>The relevant output was:</p>
          <pre className="article-code"><code>{`auto_exposure                 : Aperture Priority Mode
exposure_time_absolute        : inactive
exposure_dynamic_framerate    : value=1`}</code></pre>

          <p>
            The camera was running automatic exposure. That means it was allowed to decide how long the sensor
            should collect light. In a darker room, a longer exposure can make the image brighter and less noisy.
          </p>

          <p>But exposure takes time.</p>
          <p>At 30 FPS, the camera has roughly 33.3 ms per frame period:</p>
          <div className="article-timeline" aria-label="Thirty frames per second frame cadence">
            <span>frame 0</span><i aria-hidden="true" /><span>frame 1</span><i aria-hidden="true" /><span>frame 2</span>
            <small>33.3 ms</small><small>33.3 ms</small>
          </div>

          <p>The key control was <code>exposure_dynamic_framerate = 1</code>. That gave automatic exposure permission to lower the effective frame rate when it wanted more time.</p>

          <p>So the camera could report a nominal 30 FPS mode while actually behaving more like this:</p>
          <div className="article-timeline article-timeline-slow" aria-label="Fifteen frames per second frame cadence">
            <span>frame 0</span><i aria-hidden="true" /><span>frame 1</span><small>66.7 ms</small>
          </div>

          <p>That is approximately 15 FPS.</p>
          <p>
            It was not a bug in the camera. For normal video calling, choosing a brighter image over strict frame
            cadence is reasonable. For Melquíades, though, it was a problem. The whole project cares about how
            quickly fresh visual information can enter the pipeline.
          </p>

          <h3>Fixing the actual problem</h3>
          <p>The final camera configuration was:</p>
          <pre className="article-code"><code>{`exposure_dynamic_framerate = 0
power_line_frequency = 60 Hz`}</code></pre>

          <p>I set it with:</p>
          <pre className="article-code"><code>{`v4l2-ctl -d /dev/video0 \\
  --set-ctrl=exposure_dynamic_framerate=0,power_line_frequency=2`}</code></pre>

          <div className="sidenote-row">
            <p>
              Toronto uses 60 Hz power, so <a className="sidenote-reference" href="#power-line-note"><code>power_line_frequency=2</code></a>
              was the correct anti-flicker setting for the room.
            </p>
            <PowerLineNote />
          </div>

          <p>
            Disabling dynamic frame rate was the direct fix for cadence. It told the camera: do not silently lower
            the frame rate to make auto exposure happier.
          </p>

          <p>
            The power-line setting was separate. It helped the camera choose exposure timings that matched the local
            lighting rather than the previous 50 Hz configuration.
          </p>

          <p>After disabling dynamic frame rate, the camera returned to a genuine frame period of approximately:</p>
          <div className="article-equation">33 ms, or actual 30 FPS</div>

          <p>
            Obviously, this was not free performance. I did not somehow make the sensor collect more light in less
            time. The tradeoff is that, in darker lighting, forcing the camera to maintain cadence can produce a
            darker or noisier image. I was choosing predictable temporal behavior over the camera&apos;s automatic
            image-quality preference.
          </p>

          <h3>What I learned</h3>
          <p>
            This is where Melquíades started becoming a real systems project for me. The video was delayed. My first
            latency number was misleading. So I added timestamps, separated the pipeline into stages, tested the
            camera outside my application, and found that the bottleneck was upstream of my code.
          </p>

          <p>
            I could have optimized compression, rewritten UDP, added more threads, or blamed V4L2. None of that would
            have recovered frames the camera had decided not to deliver.
          </p>

          <blockquote>Before optimizing the software, verify what the source is actually doing.</blockquote>

          <p>Once the camera was genuinely producing 30 frames per second, the next question became much more interesting:</p>
          <blockquote>What happens when frames arrive correctly, but the next stage cannot process them fast enough?</blockquote>
          <p>That is where Melquíades becomes a queueing problem.</p>
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
