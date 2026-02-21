
// the importance of name
//mr pewa, waterloo qs
import type { HighlighterCore } from 'shiki'
import { useEffect, useState, useCallback } from 'react'
import { createHighlighter, codeToHtml } from 'shiki'
import { ShikiMagicMove } from 'shiki-magic-move/react'

import 'shiki-magic-move/dist/style.css'

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Base style to match your Catppuccin theme
const nodeStyle = {
    background: '#24273a',
    color: '#cad3f5',
    border: '2px solid #8aadf4',
    borderRadius: '8px',
    padding: '10px',
    width: 60,
    textAlign: 'center' as const,
    fontWeight: 'bold',
    // THIS IS THE MAGIC: It makes the nodes glide when coordinates change
    transition: 'all 0.6s ease-in-out', 
};

const STEPS = [
    {
        // STEP 0: Initial Forest (A:3, B:2, C:1)
        nodes: [
            { id: 'A', position: { x: 50, y: 150 }, data: { label: 'A:3' }, style: nodeStyle },
            { id: 'B', position: { x: 150, y: 150 }, data: { label: 'B:2' }, style: nodeStyle },
            { id: 'C', position: { x: 250, y: 150 }, data: { label: 'C:1' }, style: nodeStyle },
        ],
        edges: []
    },
    {
        // STEP 1: Combine the two lowest (B:2 + C:1 -> BC:3)
        nodes: [
            { id: 'A', position: { x: 50, y: 150 }, data: { label: 'A:3' }, style: nodeStyle },
            // B and C stay put, but a new parent appears
            { id: 'B', position: { x: 150, y: 150 }, data: { label: 'B:2' }, style: nodeStyle },
            { id: 'C', position: { x: 250, y: 150 }, data: { label: 'C:1' }, style: nodeStyle },
            // The new parent node!
            { id: 'BC', position: { x: 200, y: 50 }, data: { label: 'BC:3' }, style: { ...nodeStyle, border: '2px solid #a6da95' } },
        ],
        edges: [
            { id: 'e-bc-b', source: 'BC', target: 'B', animated: true, style: { stroke: '#8aadf4' } },
            { id: 'e-bc-c', source: 'BC', target: 'C', animated: true, style: { stroke: '#8aadf4' } },
        ]
    },
    {
        // STEP 2: Combine remaining (A:3 + BC:3 -> Root:6)
        nodes: [
            // A moves down to make room
            { id: 'A', position: { x: 50, y: 150 }, data: { label: 'A:3' }, style: nodeStyle },
            // B and C shift down and right
            { id: 'B', position: { x: 200, y: 250 }, data: { label: 'B:2' }, style: nodeStyle },
            { id: 'C', position: { x: 300, y: 250 }, data: { label: 'C:1' }, style: nodeStyle },
            // BC shifts down
            { id: 'BC', position: { x: 250, y: 150 }, data: { label: 'BC:3' }, style: { ...nodeStyle, border: '2px solid #a6da95' } },
            // The Final Root Node!
            { id: 'ROOT', position: { x: 150, y: 20 }, data: { label: 'Root:6' }, style: { ...nodeStyle, border: '2px solid #ed8796' } },
        ],
        edges: [
            { id: 'e-bc-b', source: 'BC', target: 'B', style: { stroke: '#8aadf4' } },
            { id: 'e-bc-c', source: 'BC', target: 'C', style: { stroke: '#8aadf4' } },
            { id: 'e-root-a', source: 'ROOT', target: 'A', animated: true, style: { stroke: '#a6da95' } },
            { id: 'e-root-bc', source: 'ROOT', target: 'BC', animated: true, style: { stroke: '#a6da95' } },
        ]
    }
];

const CODE_THEME: string = 'catppuccin-macchiato';

const SNIPPETS = {
    cargo: `cargo new <name of your compressor>`,
    starting_code:
`
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
    }`,
    run_first_time: `cargo run <name of program .rs> example.txt`
};

const InlineCode = ({children}: { children: React.ReactNode}) => (
    <code style={{ 
        background: '#24273a', // Matches Catppuccin Macchiato base
        color: '#cad3f5',      // Matches Catppuccin Text
        padding: '2px 6px', 
        borderRadius: '4px', 
        fontFamily: 'monospace',
        fontSize: '0.9em'
    }}>
        {children}
    </code>
);

const CodeBlock = ({ code, lang, highlighter }: { code: string, lang: string, highlighter?: HighlighterCore }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div style={{ position: "relative", textAlign: "left", background: "#24273a", padding: "20px", borderRadius: "8px", margin: "15px 0", overflow: "hidden" }}>
            {/* Copy Button */}
            <button 
                onClick={handleCopy}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#363a4f",
                    color: copied ? "#a6da95" : "#cad3f5", // Turns green when copied
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    zIndex: 10,
                    transition: "all 0.2s"
                }}
            >
                {copied ? "Copied!" : "Copy"}
            </button>

            {highlighter ? (
                <ShikiMagicMove
                    lang={lang}
                    theme={CODE_THEME}
                    highlighter={highlighter}
                    code={code}
                    options={{ duration: 800, stagger: 0.3 }}
                />
            ) : (
                <pre><code>Loading...</code></pre>
            )}
        </div>
    );
};

export function HuffmanAnimation() {
    const [step, setStep] = useState(0);
    const [nodes, setNodes] = useState(STEPS[0].nodes);
    const [edges, setEdges] = useState(STEPS[0].edges);

    const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

    const nextStep = () => {
        const next = (step + 1) % STEPS.length;
        setStep(next);
        setNodes(STEPS[next].nodes);
        setEdges(STEPS[next].edges);
    };

    return (
        <div style={{ margin: '20px 0', border: '1px solid #363a4f', borderRadius: '8px', padding: '10px', background: '#1e1e2e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#cad3f5' }}>Building the Tree (Step {step + 1}/{STEPS.length})</h4>
                <button 
                    onClick={nextStep}
                    style={{ background: '#8aadf4', color: '#181825', border: 'none', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    {step === STEPS.length - 1 ? "Reset" : "Next Step"}
                </button>
            </div>
            
            {/* React Flow requires a fixed height container to render! */}
            <div style={{ height: '350px', width: '100%' }}>
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges} 
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                    <Background color="#363a4f" />
                    <Controls style={{ background: '#24273a', fill: '#cad3f5' }} />
                </ReactFlow>
            </div>
        </div>
    );
}
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
            langs: ['rust', 'shell'],
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
                Oh btw, we doing this in Rust, because I was originally was doing this in C, but then got annoyed working with my poor man's hash map, 
            </p>
            <h4><b> NO EXTERNAL LIBRARIES HERE</b></h4>
            <p>
                Anyways, let's just start building our project and i'll explain as I go
            </p>
            <div>
                <InlineCode>{SNIPPETS.cargo}</InlineCode>
            </div>
            <p>This will create the project and provide us with a hello world, however we should use good practices too so lets do that plus implement the reading of the original txt file to be compressed</p>
            {/* --- SHIKI MAGIC MOVE SECTION --- */}
            <div>
                <CodeBlock code={SNIPPETS.starting_code} lang='rust' highlighter={highlighter} />
            </div>
            {/* Button to test the animation */}
            <button 
                onClick={animate}
                style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
            >
                Animate Code Step
            </button>
            <div>
                <p>
                    If your not familiar with rust it may look <i>interesting</i> this snippet however this is will be the simplest snippet here  <span>&#128128;</span>.
                    I recommend looking into the rust book as its quite simple and extensive for any keyword you don't understand,
                </p>
                <p>Anyways that snippet just read and prints the contents of a file you give in as an argument in your cli, 
                    let's prepare an example, in the same directory make a file called example.txt and write on it this,  
                    you can try running </p>
                <CodeBlock code={SNIPPETS.run_first_time} lang='shell' highlighter={highlighter} />
                
                <p>where example.txt contents are <InlineCode>Hello world</InlineCode>, after succesfully running that let's now continue with doing the actual fun part,
                <b>THE HUFFMAN TREE</b>(insert scary thunder sound in the background) (maybe click to hear it)
                </p>
                <p>Let me explain wth this tree is, a Huffman tree is a tree that represents your compression, you use it to generate the most efficient binaries for your
                    compressor and also to read the binaries to characters. Now, how do i read one? 
                    let's say you are given this tree

                     which you build from the bottom up, 
                    
                    
                    utand the way how its used is that if given a binary code you can follow it and end up in a node in that tree that equals the character that that binary represents, as you amy already think, characters that are more frequent would end up in higher levels than those that are more infrequent, anyways le</p>
            </div>
            <div>
                {/* <HuffmanAnimation /> */}
            </div>
        </div>            
        </div>
    );
} 