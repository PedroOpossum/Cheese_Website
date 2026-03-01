import { useState, useEffect } from 'react'
import soundFile from './assets/Cheese.mp3'
import StarFile from './assets/Star.mp3'
import './App.css'
import Different_Cheeses from './assets/Different-Cheeses.tsx'

function App() {

  const [counter, setCounter] = useState(0);
  const [rainbow, setRainbow] = useState(false); 
  
   const playSound = (): void => {    

    const width = 400;
    const height = 400;

    const maxLeft = window.screen.width - width;
    const maxTop = window.screen.height - height;

  // Random position
    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);
    
    const randomCheese = Different_Cheeses[Math.floor(Math.random() * Different_Cheeses.length)];
  const randomId = `CheesePopUp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const newWindow = window.open(
    "about:blank",
    randomId,
    `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
  );

  if (newWindow) {
     const body = newWindow.document.body;
      newWindow.document.title = randomCheese.name;
      body.style.margin = "0";
      body.style.overflow = "hidden";
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
      body.style.background = "#f0e68c";
      

      // Create image
      const img = newWindow.document.createElement("img");
      img.src = randomCheese.image;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.style.cursor = "pointer";
      img.style.animation = "spin 2s linear infinite";

      // Inject keyframes into popup
      const style = newWindow.document.createElement("style");
      style.innerHTML = `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      newWindow.document.head.appendChild(style);



      // Add image to popup
      body.appendChild(img);

    const audio = new Audio(soundFile);
    audio.play();

    img.onclick = () =>  {
      setCounter(prev => prev + 1); // <-- Increment counter here
      newWindow.close();
    };


  } 

  }

useEffect(() => {
  if (counter % 10 === 0 && counter !== 0) {
    const audio = new Audio(StarFile);
    audio.play();
    setRainbow(true);
    const timer = setTimeout(() => setRainbow(false), 9000);

      return () => clearTimeout(timer);
  }
}, [counter]);


  return (
    <>
    <div className={`min-h-screen transition-colors duration-500 ${
        rainbow
          ? "bg-linear-to-r from-red-500 via-yellow-400 to-purple-500"
          : "bg-yellow-300"
      }`}>
      <p className = "text-6xl font-bold top-0 items-center justify-center flex">
         The wonderful world of Cheese
      </p>
      <p className = "absolute top-4 right-4 text-xl px-3 py-1"> Count : {counter}</p>

      <div className="h-screen flex flex-col items-center justify-center gap-10">
        
        <img src="https://pngimg.com/d/cheese_PNG25295.png" className="cursor-pointer transition-transform duration-150 active:scale-85" onClick={playSound} alt="Cheese"/>
        <text className="text-2xl font-bold">Cheese</text>

      <text className = "text-2xl"> What exactly is cheese?</text>

      <a className="text-blue-500  text-xl underline" href="https://en.wikipedia.org/wiki/Cheese">I'm too lazy to explain it, just take a the wikipedia explanation of it instead</a>

      
      </div>
    </div>
    </>
  )

}

export default App
