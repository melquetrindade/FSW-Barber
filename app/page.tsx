import { Button } from "./components/ui/button"
import Header from "./components/header"
import Image from "next/image"
import { db } from './_lib/prisma'
import BarberShopItem from "./components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./components/booking-item"
import Search from "./components/search"


const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  return (
    <div>
      <Header/>
      <div className="m-2">
        <div className="p-2">
          <h2 className="text-xl font-bold">Olá, Melque!</h2>
          <p>Quinta-feira, 18 de Junho</p>
        </div>

        {/*Busca */}
        <div className="mt-4">
          <Search/>
        </div>
        
        {/*Busca rápida */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((item) => (
            <Button className="gap-2" variant='secondary' key={item.title}>
              <Image alt={item.title} src={item.imageURL} width={16} height={16}/>
              {item.title}
            </Button>
          ))}
        </div>

        {/*Imagem */}
        <div className="relative w-full h-[150px] mt-6">
          <Image alt='banner' src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>

        {/*Agendamentos */}
        <BookingItem/>

        {/*Recomendados */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>

        {/*Populares */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            popularBarbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>
        
      </div>
    </div>
    
  )
}

export default Home
