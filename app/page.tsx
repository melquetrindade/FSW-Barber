import { SearchIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import Header from "./components/header"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./components/ui/card"
import { db } from './_lib/prisma'
import BarberShopItem from "./components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./components/booking-item"


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
        <div className="flex items-center gap-2 mt-4">
          <Input placeholder='Faça sua busca'/>
          <Button>
            <SearchIcon/>
          </Button>
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

      {/*Footer */}
      <footer>
          <Card className="rounded-none ring-0">
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">© 2026 Copyright <span className="font-bold">FSW Barber</span></p>
            </CardContent>
        </Card>
      </footer>
    </div>
    
  )
}

export default Home
