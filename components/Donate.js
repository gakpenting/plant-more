import react from 'react'
export default function Donate(){
    return (<>
   <section id="donate" className="relative py-16 bg-white min-w-screen animation-fade animation-delay">
    <div className="container px-0 px-8 mx-auto sm:px-12 xl:px-5">
       
        <h3 className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-3xl md:text-4xl lg:text-5xl sm:text-center sm:mx-0">
            Donate To This Non Profit Organization Dedicated For Planting Plants</h3>

        <div
            className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl cursor-pointer" onClick={()=>window.location.href="https://teamtrees.org/"}>#TeamTrees</h3>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">Team Trees, also known as #teamtrees, is a collaborative fundraiser that raised 20 million U.S. dollars before 2020 to plant 20 million trees. The initiative was started by American YouTubers MrBeast and Mark Rober, and was mostly supported by YouTubers.</p>
        </div>
        <div
            className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl cursor-pointer" onClick={()=>window.location.href="https://www.nature.org/en-us/get-involved/how-to-help/plant-a-billion/"}>The Nature Conservancy's</h3>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
The Nature Conservancy's Plant a Billion Trees campaign is a major forest restoration effort with a goal of planting a billion trees across the planet. Trees provide so many benefits to our everyday lives. They filter clean air, provide fresh drinking water, help curb climate change, and create homes for thousands of species of plants and animals.  Planting a Billion Trees can help save the Earth from deforestation.  It’s a big number, but we know we can do it with your help.  </p>
        </div>
        <div
            className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl cursor-pointer" onCLick={()=>window.location.href="https://trees4trees.org/about/"}>Trees4Trees
            </h3>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">Trees4Trees™ is a program of Sustainable Green Earth Foundation (Yayasan Bumi Hijau Lestari). We are a non-profit foundation.
Trees4Trees produces seedlings of high value species, which are distributed to local farmers free of charge, along with technical guidance on planting, good forestry practices and education on the benefits of a healthy environment. The trees are recorded and monitored on a continuing basis.</p>
        </div>
        <div
            className="w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl cursor-pointer" onClick={()=>window.location.href="https://tree-nation.com/"}>Tree-Nation</h3>
            <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">Tree-Nation is the largest reforestation platform, allowing citizens and companies to plant trees all around the world.</p>
        </div>
    </div>
</section>

    </>);
}