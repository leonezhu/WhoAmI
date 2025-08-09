import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-logo">
            <span>xiaoxionga</span>
          </div>
          <div className="nav-links">
            {['about', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hello, 我是<span className="highlight">晓雄</span>
          </h1>
          <h2 className="hero-subtitle">
            发现 触摸 感受世界
          </h2>
          <p className="hero-description">
            不会压弯的摩的佬 二点五流程序员 召唤师峡谷白银守门员
          </p>
          <button 
            className="cta-button"
            onClick={() => scrollToSection('projects')}
          >
            看看我的项目吧!
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-content">
          <h2 className="section-title">关于我</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                你好呀，正如上面的标签描述，我其实就是一个普普通通的中年大叔。
                因为申请域名要备案，备案需要描述下你的网站信息。
                于是就通过 AI 写了这么一个个人站，用来分享自己写的工具。
              </p>
              <p>
                按理说这个区域需要写些个人的高光时刻，可惜我没有。
                唯一我个人比较认可的事情是我在 2024 年终于积攒了勇气辞职去了摩旅，走了大半个中国。
                旅途很美，也经历了很大风险，万幸活着回来了。
              </p>
              <p>
                如果你对这段经历感兴趣，我当时瞎拍瞎剪了些视频，你可以看看。
                <a href="https://space.bilibili.com/51816692/upload/video" target="_blank" rel="noopener noreferrer">
                  点击查看他的摩旅经历
                </a>
              </p>
              {/* <ul className="tech-list">
                <li>JavaScript (ES6+)</li>
                <li>TypeScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>PostgreSQL</li>
              </ul> */}
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                {/* <span>Your Photo</span> */}
                <img src="/me.jpg" alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section id="experience" className="section">
        <div className="section-content">
          <h2 className="section-title">Where I've Worked</h2>
          <div className="experience-content">
            <div className="job">
              <h3 className="job-title">
                Software Engineer <span className="company">@ Company Name</span>
              </h3>
              <p className="job-date">January 2023 — Present</p>
              <ul className="job-description">
                <li>Write modern, performant, maintainable code for a diverse array of client and internal projects</li>
                <li>Work with a variety of different languages, platforms, frameworks, and content management systems</li>
                <li>Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis</li>
              </ul>
              <div className="job-tech">
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>React</span>
                <span>Node.js</span>
              </div>
            </div>
            
            <div className="job">
              <h3 className="job-title">
                Frontend Developer <span className="company">@ Previous Company</span>
              </h3>
              <p className="job-date">June 2021 — December 2022</p>
              <ul className="job-description">
                <li>Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery</li>
                <li>Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness</li>
                <li>Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more</li>
              </ul>
              <div className="job-tech">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>jQuery</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-content">
          <h2 className="section-title">我写的一些工具</h2>
          <div className="projects-grid">
            <div className="project">
              <div className="project-content">
                <h3 className="project-title">网盘工具</h3>
                <h4 className="project-name">网盘资源搜索</h4>
                <p className="project-description">
                  一个简洁的网盘资源搜索工具<br></br>
                  支持市面上大部分主流的网盘平台的快速搜索资源
                </p>
                {/* <ul className="project-tech">
                  <li>React</li>
                  <li>Express</li>
                  <li>Spotify API</li>
                  <li>Styled Components</li>
                </ul> */}
                <div className="project-links">
                  <a href="#" className="project-link">点击试下吧</a>
                  {/* <a href="#" className="project-link">Live Demo</a> */}
                </div>
              </div>
              <div className="project-image">
                <div className="image-placeholder">
                  {/* <span>Project Screenshot</span> */}
                  <img src="/pan.png" alt="Project 1" />
                </div>
              </div>
            </div>

            <div className="project">
              <div className="project-content">
                <h3 className="project-title">Chrome 插件</h3>
                <h4 className="project-name">网页浏览觉察助手</h4>
                <p className="project-description">
                  我发现自己经常不自觉地过度使用一些网站,然后后知后觉地懊恼浪费了很多时间<br></br>
                  当访问网站的时候弹窗提醒你自己一下辅助觉察<br></br>
                  支持首次访问提醒、时长限制、每周只能访问几次
                  
                </p>
                {/* <ul className="project-tech">
                  <li>React</li>
                  <li>Vite</li>
                  <li>CSS3</li>
                  <li>JavaScript</li>
                </ul> */}
                <div className="project-links">
                  <a href="https://github.com/leonezhu/AwareMe"  target="_blank" className="project-link">GitHub</a>
                  <a href="https://chromewebstore.google.com/detail/awareme/akbnblfgnljahpgnamdghnicmkkagjjk"  target="_blank" rel="noopener noreferrer" className="project-link">Chrome商店</a>
                </div>
              </div>
              <div className="project-image">
                <div className="image-placeholder">
                  <span>Project Screenshot</span>
                  <img src="/AwareMe.png" alt="Project 1" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-content">
          <h2 className="section-title">联系我</h2>
          <p className="contact-description">
            如果你在使用我的工具时发现有任何问题，或者有什么想法想要与我沟通，欢迎联系我！
          </p>
          <a href="mailto:itzhuxiaoxiong@163.com" className="contact-button">
            发邮件给他
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="https://github.com/leonezhu" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://space.bilibili.com/51816692" target="_blank" rel="noopener noreferrer">Bilibili</a>
            <a href="https://mp.weixin.qq.com/s/VhlYgcsUXIGWuF3CBbSUHA" target="_blank" rel="noopener noreferrer">公众号</a>
          </div>
          <p className="footer-text">
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
