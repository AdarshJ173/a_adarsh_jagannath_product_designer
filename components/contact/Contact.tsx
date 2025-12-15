import React from 'react';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="relative min-h-screen flex flex-col justify-between items-center pt-24 pb-8 px-6 bg-surface overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center flex-1 w-full">

        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">Ready to start?</h2>
            <p className="text-base md:text-lg text-muted max-w-2xl mx-auto px-4">
              I'm open to freelance projects, collaborations, and discussing potential roles.
              <br className="hidden md:block" />
              Feel free to reach out through any of these platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/a-adarsh-jagannath" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 md:p-6 bg-muted/5 border border-muted/10 rounded-2xl hover:bg-muted/10 hover:border-muted/20 transition-all group">
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#0077b5]/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-text group-hover:text-[#0077b5] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted font-medium mb-1">Connect on LinkedIn</span>
                <span className="text-lg font-medium group-hover:text-[#0077b5] transition-colors">A. Adarsh Jagannath</span>
              </div>
            </a>

            {/* Twitter */}
            <a href="https://x.com/codexaaj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 md:p-6 bg-muted/5 border border-muted/10 rounded-2xl hover:bg-muted/10 hover:border-muted/20 transition-all group">
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-text/10 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-text group-hover:text-text transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted font-medium mb-1">Follow on X</span>
                <span className="text-lg font-medium group-hover:text-text transition-colors">@codexaaj</span>
              </div>
            </a>

            {/* Substack */}
            <a href="https://substack.com/@aadarshjagannath?" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 md:p-6 bg-muted/5 border border-muted/10 rounded-2xl hover:bg-muted/10 hover:border-muted/20 transition-all group">
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#FF6719]/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-text group-hover:text-[#FF6719] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted font-medium mb-1">Read on Substack</span>
                <span className="text-lg font-medium group-hover:text-[#FF6719] transition-colors">A. Adarsh Jagannath</span>
              </div>
            </a>

            {/* Gmail */}
            <a href="mailto:adarsh.aajkadev@gmail.com" className="flex items-center gap-4 p-4 md:p-6 bg-muted/5 border border-muted/10 rounded-2xl hover:bg-muted/10 hover:border-muted/20 transition-all group">
              <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#EA4335]/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-6 h-6 text-text group-hover:text-[#EA4335] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" /></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-muted font-medium mb-1">Send an Email</span>
                <span className="text-lg font-medium group-hover:text-[#EA4335] transition-colors">adarsh.aajkadev</span>
              </div>
            </a>
          </div>

          <div className="mt-12 md:mt-24 text-center">
            <h3 className="text-[13vw] md:text-9xl font-bold text-text/90 select-none tracking-tighter leading-none">
              LET'S CONNECT
            </h3>
          </div>
        </div>

        <div className="mt-8 md:mt-12 w-full text-center text-xs text-muted/50">
          © 2025 A.Adarsh Jagannath. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};