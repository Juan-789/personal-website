
// the importance of name
//mr pewa, waterloo qs


export function HowFileCompressionWorks(){
    return (
        <div
        style={{
            color: "#e0e0e0"
        }}
        >
            <h2>How Does File Compression work?</h2>
        <div>
            <h3>Motivation:</h3>
            <p>I am quite distant with films and  TV, not because there’s nothing I like
            but rather this feeling of wasting time, and I really don’t get FOMO about
            these. Anyways, decided to watch silicon valley after finding a reel make 
            fun of the fall of US-East1 AWS server, I watched the whole thing in 1-2 weeks,
            but throughout the series Pied Piper’s secret to their business is the middle-out
            compression, which made me think about compression and its quite a mystery to me 
            how they work, yet an interesting problem indeed, anyways for thus I decided to 
            build my own, <i> because I can</i>
            </p>
            <h3>Goal:</h3>
            To build a simple file compressor compatible with txt files

            <h3>The road:</h3>
            As per usual with everything, the best explanation is from an eleven year old youtube video,
        </div>
        <div>
            <div>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/R0d-rKYWKWw?si=iGzeHmJvphVHJesp" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
            </iframe>
            </div>
            <p>after watching the video and researching some more, i've narrowed down the process into some steps.
            </p>
            <p>
                Firstly, I would implement what's called a Huffman encoding,
            </p>
        </div>            
        </div>
    );
} 