import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('assignment1');

  return (
    <div className="app-container">
      {/* Assignment Switcher Header */}
      <div className="assignment-bar">
        <span className="hub-title">React Lab Submissions:</span>
        <button 
          className={activeTab === 'assignment1' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment1')}
        >
          Assignment 1: Portfolio
        </button>
        <button 
          className={activeTab === 'assignment2' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment2')}
        >
          Assignment 2: Student Portal
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === 'assignment1' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}

      {activeTab === 'assignment2' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 2: Student Portal</h1>
            <p>Props, Component Reusability & Dynamic Sorting</p>
          </header>
          <main>
            <StudentList />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}