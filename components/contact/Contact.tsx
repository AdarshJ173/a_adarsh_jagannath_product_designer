import React from 'react';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="py-24 px-6 bg-surface">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to start?</h2>
          <p className="text-lg text-muted">Available for freelance opportunities and full-time roles.</p>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-xs uppercase tracking-wider text-muted mb-2">Name</label>
              <input type="text" className="w-full bg-transparent border-b border-muted/30 py-3 text-lg focus:outline-none focus:border-text transition-colors" placeholder="John Doe" />
            </div>
            <div className="group">
              <label className="block text-xs uppercase tracking-wider text-muted mb-2">Email</label>
              <input type="email" className="w-full bg-transparent border-b border-muted/30 py-3 text-lg focus:outline-none focus:border-text transition-colors" placeholder="john@example.com" />
            </div>
          </div>
          <div className="group pt-6">
            <label className="block text-xs uppercase tracking-wider text-muted mb-2">Message</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-muted/30 py-3 text-lg focus:outline-none focus:border-text transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
          </div>
          
          <div className="flex justify-center pt-8">
            <button className="interactive px-12 py-4 bg-text text-bg rounded-full text-lg font-medium hover:bg-accent transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-24 pt-12 border-t border-muted/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <div>© 2025 A.Adarsh Jagannath. All Rights Reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-text transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-text transition-colors">Twitter</a>
            <a href="#" className="hover:text-text transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};