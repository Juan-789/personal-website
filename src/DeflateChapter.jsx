export default function DeflateChapter() {
  return (
    <section className="chapter-with-sidenote" id="why-deflate-was-not-enough">
      <div className="chapter-main">
        <h2 className="chapter-title"><span className="chapter-index">06</span><span>Why DEFLATE Was Useful, but Not Enough</span></h2>
        <p>While researching compression, I kept finding mentions of H.264.</p>

        <p>I had never really looked into it. Even the name seemed strange. Why the dot between the H and the 264? Was I supposed to know the previous 263?</p>

        <p>It is a standards designation, which is a considerably less exciting explanation than I wanted.</p>

        <p>But before learning an entire video codec, I had a simpler question:</p>

        <blockquote><p>Wouldn’t an ordinary compression algorithm work?</p></blockquote>

        <p>I knew some algorithms would be better suited to this than others. But I wanted to see what the difference actually looked like in my program.</p>

        <p>So I started with something familiar: DEFLATE.</p>

        <h3>No, I did not use my Huffman compressor</h3>

        <p>I had already written a Huffman compressor for another project, so naturally, there was a moment of “could I just use that?”</p>

        <p>For this experiment, I used DEFLATE through Rust’s <code>flate2</code> crate instead.</p>

        <p>Funny enough, Huffman coding was still involved. DEFLATE combines LZ77-style references to repeated byte sequences with Huffman coding. It is lossless: decompressing the result gives back the original bytes. <a href="https://www.rfc-editor.org/rfc/rfc1951.html">DEFLATE specification</a></p>

        <p>That made the first implementation easy to reason about:</p>

        <pre className="article-code"><code>{"raw frame\n    → compress its bytes\n    → split the result into UDP chunks\n    → send\n    → reassemble\n    → decompress\n    → display"}</code></pre>

        <p>I did not need to understand motion estimation, reference pictures, or decoder recovery yet.</p>

        <p>Each frame was its own compressed stream. If one frame failed to arrive, the next complete frame could still be decompressed independently.</p>

        <p>That independence was useful while I was figuring out everything else.</p>

        <h3>It worked well enough to teach me something</h3>

        <p>The original source was my 640×480 camera, using two bytes per pixel:</p>

        <div className="article-equation">640 × 480 × 2 = 614,400 bytes per frame</div>

        <p>In one recorded baseline, fast DEFLATE reduced that to roughly 434 KB.</p>

        <p>About a 29% reduction.</p>

        <p>With up to 1,200 payload bytes in each UDP packet, that still meant approximately 362 packets per frame.</p>

        <p>Which sounds like a lot, because it is.</p>

        <p>But on my LAN, the experiment worked. One recorded run completed all 900 frames. That gave me a working system I could inspect and measure before introducing a more complicated codec.</p>

        <p>The compression ratio also depended heavily on what was in the image.</p>

        <p>Large regions of repeated pixels are friendly to a byte compressor. Camera noise, detailed textures, and complicated images are less cooperative. An impressive result on a nearly uniform image does not tell me what will happen while sharing a moving desktop.</p>

        <p>And compression itself took time.</p>

        <p>Fast DEFLATE used roughly 8–9 ms per camera frame in those measurements. At 30 FPS, a frame period is only 33.3 ms.</p>

        <p>Saving network traffic was useful, but I was spending part of my processing budget to do it.</p>

        <h3>Then the image got much bigger</h3>

        <p>Screen capture changed the scale of the problem.</p>

        <p>The Mac screen stream used 1920×1080 BGRA images:</p>

        <div className="article-equation">1920 × 1080 × 4 = 8,294,400 bytes per frame</div>

        <p>That is 13.5 times as many raw bytes as the original camera frame.</p>

        <p>Without compression, it would take 6,912 chunks of 1,200 bytes to carry one image.</p>

        <p>Even a hypothetical 40% reduction would leave about five megabytes, or roughly 4,148 chunks per frame.</p>

        <p>The exact ratio would depend on the screen content, but the direction was pretty clear.</p>

        <p>I needed to send less.</p>

        <p>My first thought was to find a better compressor.</p>

        <p>My second thought was to make one.</p>

        <p>Why not?</p>

        <p>Well, before accidentally turning a video-call experiment into a codec research project, I wanted to understand what the existing codecs were buying me.</p>

        <h3>Why not just send more packets?</h3>

        <p>More packets mean more work: more sends, more receives, more headers, and more opportunities to fill a queue while the receiver is busy.</p>

        <p>They also give an incomplete frame more ways to happen.</p>

        <p>My receiver needed every chunk of a compressed frame before it could reconstruct that frame. If one chunk was missing, I could not just pretend those bytes were there.</p>

        <p>Consider a deliberately simplified model.</p>

        <p>Suppose every packet has an independent 0.1% chance of being lost. That is one in a thousand.</p>

        <p>The probability that all n packets arrive is:</p>

        <div className="article-equation">P(complete frame) = (1 − p)ⁿ</div>

        <p>So the probability of losing at least one is:</p>

        <div className="article-equation">P(incomplete frame) = 1 − (1 − p)ⁿ</div>

        <p>With p = 0.001:</p>

        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Packets needed for a frame</th><th scope="col">Chance at least one is lost</th></tr></thead>
          <tbody>
            <tr><th scope="row">200</th><td>18.1%</td></tr>
            <tr><th scope="row">400</th><td>33.0%</td></tr>
            <tr><th scope="row">1,000</th><td>63.2%</td></tr>
          </tbody>
        </table></div>

        <p>These are hypothetical numbers, not measurements from my network. Real losses can arrive in bursts, and sending more traffic can change the loss rate itself.</p>

        <p>But the example explains why “just send more packets” deserves some suspicion.</p>

        <p>Reducing the number of packets would not guarantee delivery. It would reduce how many pieces had to survive for one frame to be usable.</p>

        <p>I needed the dropped packets to drop.</p>

        <p>You know what I mean.</p>

        <h3>DEFLATE kept forgetting the previous image</h3>

        <p>The bigger limitation was how I was using compression.</p>

        <p>Every call created a new DEFLATE encoder for one frame. It compressed that frame’s bytes, finished, and forgot everything.</p>

        <p>Then the next frame arrived.</p>

        <p>Imagine sharing a desktop where only the cursor moves.</p>

        <p>Most of the screen is unchanged. The wallpaper is still there. The windows are still there. The text is still there.</p>

        <p>My program nevertheless handed the compressor another complete image.</p>

        <p>DEFLATE could exploit repeated byte sequences inside that image, but my independent-frame setup gave it no memory of the image I had just sent.</p>

        <p>A video codec can exploit that relationship between pictures.</p>

        <p>The term I was looking for was temporal redundancy: information repeated over time.</p>

        <h3>H.264 has more context</h3>

        <p>H.264 can predict parts of an image using reference pictures the decoder already has. It sends information describing the prediction and a coded correction, often called the residual.</p>

        <p>For example, if image content has shifted, motion information can describe where to find a useful match in a reference picture.</p>

        <p>It also compresses within pictures. In typical lossy operation, quantization trades some precision for fewer bits. Its advantage is therefore broader than simply subtracting the previous frame. <a href="https://www.itu.int/rec/T-REC-H.264">H.264 specification</a></p>

        <p>Conceptually, that was the change I needed:</p>

        <blockquote><p>My DEFLATE setup: “Here is another entire image, compressed independently.”</p></blockquote>

        <blockquote><p>Video coding: “Here is how to reconstruct this image using information you already have, plus the information that changed.”</p></blockquote>

        <p>That is a simplification, but it explains why video deserves more than treating every frame as an unrelated file.</p>

        <h3>I, P, and B frames</h3>

        <p>These names kept appearing while I was reading, so here is the useful beginner version:</p>

        <div className="article-table-wrapper"><table className="article-table">
          <thead><tr><th scope="col">Type</th><th scope="col">Basic idea</th></tr></thead>
          <tbody>
            <tr><th scope="row">I — Intra</th><td>Uses information within the picture, without prediction from other pictures.</td></tr>
            <tr><th scope="row">P — Predictive</th><td>Can predict from already decoded reference pictures. It is not limited to the immediately preceding frame.</td></tr>
            <tr><th scope="row">B — Bi-predictive</th><td>Can combine predictions from two reference lists, often using pictures before and after it in display order.</td></tr>
          </tbody>
        </table></div>

        <p>Strictly, H.264 defines these coding types at the slice level; “I/P/B frames” is the usual shorthand. <a href="https://www.itu.int/rec/T-REC-H.264">H.264 specification</a></p>

        <p>The “after it” part initially sounds suspicious.</p>

        <p>How can the decoder use a picture from the future?</p>

        <p>Because decoding order and display order do not have to match. A later picture can be decoded first, then used to reconstruct a picture that will be displayed before it.</p>

        <p>That can improve compression, but waiting for later pictures and reordering output can add delay. For Melquíades, I requested Constrained Baseline encoding and disabled frame reordering. Apple discusses this tradeoff in its <a href="https://developer.apple.com/videos/play/wwdc2021/10158/">low-latency VideoToolbox session</a>.</p>

        <p>There was a new complication, though.</p>

        <p>With independently compressed frames, losing one did not affect my ability to decompress the next.</p>

        <p>With predictive video, losing a reference picture can affect later pictures too.</p>

        <p>The thing that saves bytes also creates dependencies.</p>

        <p>I would eventually need to understand recovery points, including IDR pictures, rather than treating every encoded frame as disposable. That became part of the next chapter.</p>

        <h3>A slightly unreasonable detour</h3>

        <p>While reading about prediction, I started wondering how far the idea could go.</p>

        <p>What if a receiver could predict motion while waiting for the next update?</p>

        <p>I came across <a href="https://openaccess.thecvf.com/content/CVPR2026/html/Baumann_Envisioning_the_Future_One_Step_at_a_Time_CVPR_2026_paper.html">Envisioning the Future, One Step at a Time</a>, which explores predicting possible future motion through sparse point trajectories. Instead of generating every pixel of a future video, its model rolls out how selected points might move.</p>

        <p>That is pretty cool.</p>

        <p>It also is not a ready-made replacement for H.264. The paper studies plausible future motion, not transmitting and reconstructing the actual screen content.</p>

        <p>The distinction matters. A model might predict where something is likely to move. It cannot know which unexpected character I am about to type.</p>

        <p>I could imagine experimenting with prediction to hide brief gaps, provided the receiver could correct itself when real information arrived. That is my speculation, not a result demonstrated by the paper.</p>

        <p>Faster GPUs might make more experiments practical. They would not make an uncertain future stop being uncertain.</p>

        <p>For now, I had enough problems delivering pixels that actually existed.</p>

        <h3>Why I am glad I started with DEFLATE</h3>

        <p>DEFLATE gave me a simple, lossless baseline.</p>

        <p>I could inspect raw images, compress each frame independently, measure the cost, and debug packetization without also debugging a stateful video decoder.</p>

        <p>That made it useful even though I eventually needed something else.</p>

        <p>By the time I moved toward H.264, I had a concrete reason: the larger screen images exposed how much information I was repeatedly sending, and how much work that created for the rest of the system.</p>

        <p>Now I had to learn what happened when a frame depended on the ones before it.</p>
      </div>
    </section>
  )
}
