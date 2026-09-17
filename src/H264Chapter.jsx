function H265Note() {
  return (
    <div className="sidenote-anchor" id="h265-note">
      <aside className="article-sidenote" aria-label="Detour: why not H.265 or HEVC">
        <span className="sidenote-type">DETOUR</span>
        <h3>Why not H.265 / HEVC?</h3>
        <p>
          H.265 is the successor to H.264 and can often achieve similar visual quality at a lower bitrate. The
          commonly repeated “half the bitrate” slogan is a design target, not a guarantee. Actual savings depend on
          content, resolution, quality target, and encoder settings.
        </p>
        <p>My M4 Mac supports hardware HEVC encoding and decoding. The current receiver uses OpenH264, which only handles H.264.</p>
        <p>
          An HEVC experiment would need a new end-to-end path: VideoToolbox HEVC output, a compatible Linux decoder,
          probably through VA-API, and careful measurement of encode time, decode time, keyframe size, packet loss,
          and glass-to-glass latency.
        </p>
        <p>
          H.264 was the useful first choice because it gave me hardware encoding on the Mac, a known Linux decoder,
          and a large ecosystem for debugging the rest of the pipeline.
        </p>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> Why not H.265 / HEVC?</summary>
        <p>
          H.265 is the successor to H.264 and can often achieve similar visual quality at a lower bitrate. The
          commonly repeated “half the bitrate” slogan is a design target, not a guarantee. Actual savings depend on
          content, resolution, quality target, and encoder settings.
        </p>
        <p>My M4 Mac supports hardware HEVC encoding and decoding. The current receiver uses OpenH264, which only handles H.264.</p>
        <p>
          An HEVC experiment would need a new end-to-end path: VideoToolbox HEVC output, a compatible Linux decoder,
          probably through VA-API, and careful measurement of encode time, decode time, keyframe size, packet loss,
          and glass-to-glass latency.
        </p>
        <p>
          H.264 was the useful first choice because it gave me hardware encoding on the Mac, a known Linux decoder,
          and a large ecosystem for debugging the rest of the pipeline.
        </p>
      </details>
    </div>
  )
}

function AccessUnitNote() {
  return (
    <div className="sidenote-anchor" id="access-unit-note">
      <aside className="article-sidenote" aria-label="Detour: what is an access unit">
        <span className="sidenote-type">DETOUR</span>
        <h3>What is an access unit?</h3>
        <p>
          H.264 organizes its bytes into smaller pieces called NAL units. Some contain encoded image slices; others
          carry configuration or additional information.
        </p>
        <p>
          An access unit groups the NAL units associated with one coded picture. In Melquiades, that means one video
          frame. Think of it as the encoded frame&apos;s package: it can contain several NAL units, and sending that package
          might require one UDP packet or hundreds.
        </p>
        <p>
          A packet boundary does not necessarily match a NAL boundary. Melquiades assigns one <code>frame_id</code> to
          the whole access unit and reassembles its fragments before decoding.
        </p>
        <p>
          Complete does not mean independently decodable. Having every byte of a predicted frame does not help if the
          decoder is missing a reference picture it needs. A complete IDR, together with the required SPS/PPS, provides
          a recovery point.
        </p>
        <a href="https://datatracker.ietf.org/doc/html/rfc6184">Further reading: H.264 terminology and packetization →</a>
      </aside>

      <details className="article-sidenote-mobile">
        <summary><span>DETOUR</span> What is an access unit?</summary>
        <p>
          H.264 organizes its bytes into smaller pieces called NAL units. Some contain encoded image slices; others
          carry configuration or additional information.
        </p>
        <p>
          An access unit groups the NAL units associated with one coded picture. In Melquiades, that means one video
          frame. Think of it as the encoded frame&apos;s package: it can contain several NAL units, and sending that package
          might require one UDP packet or hundreds.
        </p>
        <p>
          A packet boundary does not necessarily match a NAL boundary. Melquiades assigns one <code>frame_id</code> to
          the whole access unit and reassembles its fragments before decoding.
        </p>
        <p>
          Complete does not mean independently decodable. Having every byte of a predicted frame does not help if the
          decoder is missing a reference picture it needs. A complete IDR, together with the required SPS/PPS, provides
          a recovery point.
        </p>
        <a href="https://datatracker.ietf.org/doc/html/rfc6184">Further reading: H.264 terminology and packetization →</a>
      </details>
    </div>
  )
}

export default function H264Chapter() {
  return (
    <section className="chapter-with-sidenote" id="what-h264-actually-changed">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">07</span><span>What H.264 Actually Changed</span></h2>

        <p>By this point, I understood the broad reason a video codec exists.</p>
        <p>DEFLATE could compress one image. H.264 could use information from earlier images, meaning it did not need to keep sending the whole desktop as if nothing had happened before.</p>
        <p>That was the theory. The next question was much more practical:</p>
        <blockquote>Can I take a real macOS screen image, encode it in hardware, send it to Linux, and get something a decoder actually understands?</blockquote>
        <p>This turned out to involve more than adding an H.264 crate.</p>

        <h3>I was not looking for a Rust codec</h3>
        <p>Before Melquiades touched a frame, the Mac had already done a lot of work. ScreenCaptureKit captured the display and handed my callback a <code>CMSampleBuffer</code>. That gave me a <code>CVPixelBuffer</code>, backed by an <code>IOSurface</code>: a native image buffer that macOS media and graphics APIs know how to share.</p>
        <p>In the raw screen-sharing path, I copied that image into my own frame pool:</p>
        <pre className="article-code"><code>{'ScreenCaptureKit\n    → CVPixelBuffer\n    → CPU copy into FramePool\n    → DEFLATE\n    → UDP'}</code></pre>
        <p>That was useful for understanding capture and ownership. But copying an entire 1920×1080 BGRA screen image means moving about 8 MB of memory before compression even starts.</p>
        <p>For H.264, I wanted a different path:</p>
        <pre className="article-code"><code>{'ScreenCaptureKit\n    → IOSurface\n    → VideoToolbox H.264 encoder\n    → encoded bytes\n    → UDP'}</code></pre>
        <p>VideoToolbox is Apple&apos;s low-level video framework. It provides access to the hardware encoders and decoders built into Apple devices. My M4 Mac mini has hardware acceleration for both H.264 and HEVC, but I started with H.264 because my Linux receiver already had a compatible baseline decoder: OpenH264. <a href="https://support.apple.com/en-ie/121555">Apple&apos;s M4 Mac mini specifications</a></p>
        <p>The useful part was that VideoToolbox could consume the IOSurface directly. I did not need to first turn the entire screen image into one giant Rust <code>Vec&lt;u8&gt;</code>.</p>
        <p>That did not make Melquiades completely zero-copy. Encoded output still becomes owned bytes, the receiver eventually decodes them, and the renderer still needs pixels in the format it understands. But it removed one very expensive raw-frame copy before encoding.</p>

        <h3>One persistent encoder, not one encoder per frame</h3>
        <p>I created one <code>CompressionSession</code> for a fixed stream shape:</p>
        <pre className="article-code"><code>{'1920 × 1080\n30 FPS\n8 Mb/s average bitrate\none recovery keyframe at most every 30 frames\nH.264 Constrained Baseline'}</code></pre>
        <p>The encoder stays alive across frames. That matters because video encoding is stateful. It remembers reference pictures, holds hardware resources, and has configuration that should not be recreated thirty times each second.</p>
        <p>I also requested real-time operation and disabled frame reordering. Some video encoders use B-pictures, which can reference images from both before and after them in display order. That can improve compression, but it also means the system may need to wait for a future image before decoding or displaying a current one.</p>
        <p>That is a reasonable trade for a movie file. It is less reasonable if I am trying to react to someone breaking my BedWars bed. This session was not asking for the best possible compression ratio. It was asking for a stream that could stay recent.</p>

        <h3>The first result was weirdly small</h3>
        <p>A raw 1080p screen image is always about 8.29 MB in this experiment. An H.264 output is not.</p>
        <p>In one mostly static desktop run, ordinary encoded outputs looked roughly like this:</p>
        <pre className="article-code"><code>{'normal access units:\np50   ≈ 412 bytes\np90   ≈ 8.4 KB\np99   ≈ 24.5 KB\n\nperiodic recovery frames:\nroughly 175–300 KB'}</code></pre>
        <p>Those numbers are not universal. A moving game, video, or rapidly changing desktop produces different results. But the scale change was still kind of insane: the median ordinary output in that run was hundreds of bytes rather than millions.</p>
        <p>Then there were the much larger recovery frames. That was the first hint that H.264 had not merely made frames smaller. It had changed what a frame was.</p>

        <h3>One screen image becomes an access unit</h3>
        <p>Before H.264, Melquiades had a simple model:</p>
        <pre className="article-code"><code>{'one captured image\n    = one compressed byte stream\n    = one independently usable frame'}</code></pre>
        <div className="sidenote-row">
          <p>
            With H.264, one captured image becomes an <a className="sidenote-reference" href="#access-unit-note"><strong>access unit</strong></a>.
            It can contain one or more smaller typed pieces called NAL units, or Network Abstraction Layer units.
          </p>
          <AccessUnitNote />
        </div>
        <p>So the useful hierarchy became:</p>
        <pre className="article-code"><code>{'one screen image\n    → one encoded H.264 access unit\n        → one or more NAL units\n            → later split across one or more UDP packets'}</code></pre>
        <p>Those last two layers are easy to confuse. A NAL unit is not a UDP packet. An access unit is not necessarily a UDP packet either.</p>
        <p>Melquiades gives every complete access unit one <code>frame_id</code>. The later UDP layer can split that byte sequence into packets, but the receiver must put it back together before asking the decoder to do anything with it. A partial H.264 access unit is not “a lower-quality frame.” It is usually just broken input.</p>

        <h3>Keyframes became recovery points</h3>
        <p>The H.264 implementation made one kind of picture especially important: an <strong>IDR</strong>, or Instantaneous Decoder Refresh.</p>
        <p>An IDR picture is a recovery boundary. After decoding one, the decoder is not supposed to use reference pictures from before that IDR to reconstruct later pictures. That makes it useful when joining a stream late or recovering after loss.</p>
        <p>Melquiades treats IDR output as a keyframe. At 30 FPS with a maximum keyframe interval of 30, I am asking the encoder for one at least once per second.</p>
        <pre className="article-code"><code>{'small predicted frames\n    → usually cheap to send\n\nlarge IDR frame\n    → expensive, but lets a decoder recover'}</code></pre>
        <p>More keyframes mean faster recovery after damage, but more bandwidth and larger bursts. Fewer keyframes save bandwidth, but losing synchronization can leave the receiver waiting longer.</p>

        <h3>The decoder needs more than an IDR</h3>
        <p>There was another H.264 detail hiding behind the word “keyframe.” A decoder also needs configuration information.</p>
        <ul>
          <li><strong>SPS, or Sequence Parameter Set:</strong> stream-level information, including profile and picture dimensions.</li>
          <li><strong>PPS, or Picture Parameter Set:</strong> picture-level decoding configuration.</li>
        </ul>
        <p>An IDR frame without the SPS and PPS it depends on may not be enough for a fresh decoder to begin. On UDP, the receiver can start after the sender, miss an earlier keyframe, or lose a packet and deliberately throw away its current decoder state.</p>
        <p>A recovery frame should therefore be more like:</p>
        <pre className="article-code"><code>{'SPS + PPS + complete IDR\n    → decoder knows how to interpret the image\n    → later predicted frames become meaningful again'}</code></pre>
        <p>VideoToolbox made this slightly non-obvious. It returned H.264 image data, but sometimes stored SPS and PPS separately in CoreMedia&apos;s format description rather than placing them inside the encoded frame bytes.</p>
        <p>So Melquiades reads those parameter sets once, copies them into its own memory, caches them for the lifetime of the fixed encoder session, and attaches them to IDR access units when needed. That meant every recovery keyframe could stand on its own.</p>

        <h3>AVCC versus Annex B: identical video, different boundaries</h3>
        <p>VideoToolbox returns H.264 in a form called <strong>AVCC</strong>:</p>
        <pre className="article-code"><code>{'[length][NAL bytes][length][NAL bytes]...'}</code></pre>
        <p>The Linux OpenH264 decoder expects <strong>Annex B</strong> instead:</p>
        <pre className="article-code"><code>{'[00 00 00 01][NAL bytes][00 00 00 01][NAL bytes]...'}</code></pre>
        <p>The actual compressed video data is the same. What changes is how the decoder finds the boundaries between NAL units.</p>
        <p>So Melquiades performs a conversion:</p>
        <pre className="article-code"><code>{'VideoToolbox output\n    → AVCC length-prefixed NAL units\n    → replace lengths with Annex B start codes\n    → prepend cached SPS/PPS before IDRs when needed\n    → one decoder-ready H.264 access unit'}</code></pre>
        <p>This was not transcoding. I was not decoding H.264 and encoding it again. I was changing the packaging around the same NAL bytes so the Linux decoder could understand their boundaries.</p>

        <h3>The Linux side was not magically simple either</h3>
        <p>OpenH264 accepts the Annex B access unit and produces YUV420 image planes. My renderer expects tightly packed BGRA pixels.</p>
        <pre className="article-code"><code>{'complete Annex B access unit\n    → OpenH264 software decode\n    → YUV420 planes\n    → convert to RGBA\n    → swap red and blue for BGRA\n    → display'}</code></pre>
        <p>This is deliberately a correctness-first path. It proves that the Mac can capture a screen, hardware-encode it, send complete H.264 access units over the LAN, and have Linux reconstruct a displayable image.</p>
        <p>It is not the final low-copy renderer. Hardware decode through VA-API and a more GPU-native presentation path are still future work.</p>

        <div className="sidenote-row">
          <p>
            A natural next question is <a className="sidenote-reference" href="#h265-note">why not H.265 / HEVC?</a>
          </p>
          <H265Note />
        </div>

        <h3>H.264 did not solve networking</h3>
        <p>At this point, Melquiades had stopped sending raw screenshots. That was a major improvement.</p>
        <p>But it had gained stateful decoding, recovery frames, parameter sets, two H.264 byte-stream formats, and a new distinction between an encoded access unit and the UDP packets that would carry it.</p>
        <p>The next problem was therefore:</p>
        <blockquote>How do I transport one complete, decoder-ready H.264 access unit over UDP without confusing packet boundaries for video boundaries?</blockquote>
        <p>That became the protocol.</p>
      </div>
    </section>
  )
}
