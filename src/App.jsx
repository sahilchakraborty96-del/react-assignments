import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import EmployeeDirectory from './components/EmployeeDirectory';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('assignment1');

  return (
    <div className="app-container">
      {/* Top Assignment Navigation Bar */}
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
        <button 
          className={activeTab === 'assignment3' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment3')}
        >
          Assignment 3: Employee Directory
        </button>
        <button 
          className={activeTab === 'assignment4' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment4')}
        >
          Assignment 4: Weather Dashboard
        </button>
      </div>

      {/* Assignment 1 View */}
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

      {/* Assignment 2 View */}
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

      {/* Assignment 3 View */}
      {activeTab === 'assignment3' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 3: Farm Employee Directory</h1>
            <p>State, Events, Conditional Rendering & CRUD Operations</p>
          </header>
          <main>
            <EmployeeDirectory />
          </main>
          <Footer />
        </>
      )}

      {/* Assignment 4 View */}
      {activeTab === 'assignment4' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 4: Weather Dashboard</h1>
            <p>API Integration, useEffect Hook & Asynchronous Data Fetching</p>
          </header>
          <main>
            <WeatherDashboard />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}