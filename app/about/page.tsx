"use client"

const About = () => {
  return (
    <div>
      <h1 className="text-red-500 mb-5 bg-white">
        About Page
      </h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqpag24e4p54Kpks_0eKFO28aDnGcTBeFWnojNNDgumw&s=10" alt="imagem"></img>
      <button onClick={() => {console.log('fui clicado')}}>Clique</button>
    </div>
    
  )
}

export default About