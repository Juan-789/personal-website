
// the importance of name
//mr pewa, waterloo qs
import type { HighlighterCore } from 'shiki'
import { useEffect, useState } from 'react'
import { createHighlighter, codeToHtml } from 'shiki'
import { ShikiMagicMove } from 'shiki-magic-move/react'

import 'shiki-magic-move/dist/style.css'


export function HowFileCompressionWorks(){
    const [code, setCode] = useState(`
                use std::error::Error;

                fn main()-> Result<(), Box<dyn Error>>{
                    let args: Vec<String> = env::args().collect();
                    let argc = args.len();
                    if argc == 1 {
                        return Err("Not given a file".into());
                    }
                    let file_path = &args[1];
                    
                    let contents = read_to_string(file_path)?;

                    println!("file contents");
                    println!("{}", contents);
                    return Ok(());
                }`)
    const [highlighter, setHighlighter] = useState<HighlighterCore>()

    useEffect(() => {
        async function initializeHighlighter() {
        const highlighter = await createHighlighter({
            themes: ['catppuccin-macchiato'],
            langs: ['rust'],
        })
        setHighlighter(highlighter)
        }
        initializeHighlighter()
    }, [])

    function animate() {
        if (code.includes("fn main")) {
                setCode(`// Look how smooth this transition is!
    fn main() {
        println!("Compressed successfully!");
    }`)
            } else {
                // Reset for demo purposes
                setCode(`use std::error::Error;
    use std::env;

    fn main() -> Result<(), Box<dyn Error>> {
        let args: Vec<String> = env::args().collect();
        // ... original code
    }`)
                }
    }

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
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
            </iframe>
            </div>
            <p>after watching the video and researching some more, i've narrowed down the process into some steps.
            </p>
            <ol>
                <li>
                    I want my program to be a cli tool, where people just call my program, give me a file and I compress it  
                </li>
                <li>
                    once given the file I have to build the huffman tree, (this involve some smaller steps)
                </li>
                <li>
                    write the new compressed .juan file
                </li>
            </ol>
            Sounds simple right?, it kinda is
            <p>
                Oh btw, we doing this in Rust, because I was originally was doing this in C, but then got annoyed working with my poor man's dictionary, 
            </p>
            <h4><b> NO EXTERNAL LIBRARIES HERE</b></h4>
            <p>
                Anyways, let's just start building our project and i'll explain as I go
            </p>
            <code>
                cargo new &lt;name of your compressor&gt;
            </code>
            <p>This will create the prohject and provide us with a hello world, however we should use good practices too so lets do that p[lus implement the reading of the origibnal txt file to be compressed] </p>
            {/* --- SHIKI MAGIC MOVE SECTION --- */}
            <div style={{ 
                textAlign: "left", // Force left align
                // background: "#2e3440", // Matches 'nord' theme background
                padding: "20px", 
                borderRadius: "8px",
                overflow: "hidden" 
            }}>
                {highlighter ? (
                    <ShikiMagicMove
                        lang="rust"
                        theme="catppuccin-macchiato"
                        highlighter={highlighter}
                        code={code}
                        options={{ duration: 800, stagger: 0.3 }}
                    />
                ) : (
                    <pre><code>Loading highlighter...</code></pre>
                )}
            </div>
            
            {/* Button to test the animation */}
            <button 
                onClick={animate}
                style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
            >
                Animate Code Step
            </button>
        </div>            
        </div>
    );
} 