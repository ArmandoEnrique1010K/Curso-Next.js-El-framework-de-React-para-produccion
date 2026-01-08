const temporalAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000)
  })
}

export default async function Navbar() {

  await temporalAsync();
  
  return (
    // La opacidad en tailwind v4 se especifica colocando un / luego 
    // de un color de fondo seguido del nivel de opacidad (0 a 100)
    <nav className="flex bg-blue-800/30 p-2 m-2 rounded-md">
      
      <span>Home</span>

      <div className="flex flex-1"></div>

        <a className="mr-2" href="/about">About</a>
        <a className="mr-2" href="/pricing">Pricing</a>
        <a className="mr-2" href="/contact">Contact</a>
    </nav>
  );
}