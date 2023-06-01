import React from 'react';
import './styles/about.css' 

const AboutPage = () => {
  return (
    <div className="about-page">
    <div className='heading1'>
        About
    </div>
        <div className='cont'>
            <div className='sub-cont'>
                <h2 className='heading2'>Welcome to the Institute of Space and Technology (IST)</h2>
                <p className='bullets'>At IST, we are dedicated to fostering excellence in space science and technology education, research, and innovation. As a leading educational institution in Pakistan, we strive to provide our students with a transformative learning experience and equip them with the skills and knowledge to excel in the field of space exploration and technology.</p>
            </div>
            <div className='img-cont'>
                <img src='https://www.ist.edu.pk/assets/img/slides/for%20web.jpg' alt='.'  className='dp'/>
            </div>
    
        </div>
      
      <ul>
            <li>Mission:
                    Our mission is to cultivate a passion for space science and technology among our students, nurturing their intellectual curiosity and fostering a spirit of innovation. We aim to produce graduates who are well-prepared to address the challenges of the space industry and contribute to the advancement of space exploration.</li>
                    
            <li>Academic Excellence:
                IST offers a wide range of undergraduate, graduate, and doctoral programs in disciplines such as Aerospace Engineering, Electrical Engineering, Mechanical Engineering, Materials Science and Engineering, Space Science, and Remote Sensing. Our programs are designed to provide a strong foundation in theoretical knowledge, hands-on practical experience, and research opportunities.</li>
            <li>
            Research and Innovation:
                We believe that research and innovation are key drivers of progress in the field of space science and technology. Our faculty members and students actively engage in cutting-edge research projects, collaborating with national and international partners. Through our research initiatives, we aim to contribute to advancements in space technology, satellite systems, propulsion systems, and remote sensing.</li>
            <li>
            State-of-the-Art Facilities:
                IST is equipped with modern facilities and laboratories to facilitate high-quality teaching, research, and practical training. Our students have access to advanced equipment and resources, allowing them to gain practical experience in areas such as satellite technology, space systems engineering, and data analysis.</li>
            <li>
            Industry Partnerships:
                We maintain strong collaborations with industry partners, including space agencies and research institutes. These partnerships provide our students with valuable exposure to real-world challenges, internships, and potential career opportunities in the space industry. We are committed to nurturing a strong industry-academia interface to bridge the gap between academic knowledge and industry requirements.</li>
            <li>
            Extracurricular Activities:
                At IST, we encourage a holistic approach to education. Along with academic pursuits, we offer various extracurricular activities, student societies, and clubs related to space exploration and research. Students have the opportunity to participate in seminars, workshops, conferences, and competitions, fostering their personal and professional growth.</li>
        </ul>
    
    </div>
  );
};

export default AboutPage;
