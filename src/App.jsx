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
import ShoppingCart from './components/ShoppingCart';
import TaskManager from './components/TaskManager';
import AuthSystem from './components/AuthSystem';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('assignment1');

  return (
    <div className="app-container">
      {/* Master Hub Navigation Bar */}
      <div className="assignment-bar">
        <span className="hub-title">React Lab Submissions:</span>
        <button 
          className={activeTab === 'assignment1' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment1')}
        >
          1: Portfolio
        </button>
        <button 
          className={activeTab === 'assignment2' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment2')}
        >
          2: Student Portal
        </button>
        <button 
          className={activeTab === 'assignment3' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment3')}
        >
          3: Employee Directory
        </button>
        <button 
          className={activeTab === 'assignment4' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment4')}
        >
          4: Weather Dashboard
        </button>
        <button 
          className={activeTab === 'assignment5' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment5')}
        >
          5: Shopping Cart
        </button>
        <button 
          className={activeTab === 'assignment6' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment6')}
        >
          6: Task Manager
        </button>
        <button 
          className={activeTab === 'assignment7' ? 'tab-btn active' : 'tab-btn'} 
          onClick={() => setActiveTab('assignment7')}
        >
          7: Auth & Registration
        </button>
      </div>

      {/* Assignment 1: Personal Portfolio */}
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

      {/* Assignment 2: Student Information Portal */}
      {activeTab === 'assignment2' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 2: Student Portal</h1>
            <p>Props, Component Hierarchy & Dynamic Sorting by CGPA</p>
          </header>
          <main>
            <StudentList />
          </main>
          <Footer />
        </>
      )}

      {/* Assignment 3: Employee Directory */}
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

      {/* Assignment 4: Weather Dashboard */}
      {activeTab === 'assignment4' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 4: Weather Dashboard</h1>
            <p>OpenWeather API Integration, useEffect Hook & Asynchronous Fetching</p>
          </header>
          <main>
            <WeatherDashboard />
          </main>
          <Footer />
        </>
      )}

      {/* Assignment 5: Shopping Cart */}
      {activeTab === 'assignment5' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 5: E-Commerce Shopping Cart</h1>
            <p>Global State Management via useContext and useReducer Hooks</p>
          </header>
          <main>
            <ShoppingCart />
          </main>
          <Footer />
        </>
      )}

      {/* Assignment 6: Task Manager */}
      {activeTab === 'assignment6' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 6: Task Manager</h1>
            <p>CRUD Operations, Priority Filtering & LocalStorage Persistence</p>
          </header>
          <main>
            <TaskManager />
          </main>
          <Footer />
        </>
      )}

      {/* Assignment 7: User Authentication & Registration */}
      {activeTab === 'assignment7' && (
        <>
          <header className="hero" style={{ padding: '2.5rem 1rem' }}>
            <h1>Assignment 7: Authentication & Registration System</h1>
            <p>Form Validation, Regex Email Verification & LocalStorage Sessions</p>
          </header>
          <main>
            <AuthSystem />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}