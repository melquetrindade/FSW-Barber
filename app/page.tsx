import { SearchIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import Header from "./components/header"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Avatar, AvatarImage } from "./components/ui/avatar"
import { db } from './_lib/prisma'
import BarberShopItem from "./components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  })
  //console.log({barbershops})

  return (
    <div>
      <Header/>
      <div className="m-2">
        <div className="p-2">
          <h2 className="text-xl font-bold">Olá, Melque!</h2>
          <p>Quinta-feira, 18 de Junho</p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Input placeholder='Faça sua busca'/>
          <Button>
            <SearchIcon/>
          </Button>
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image alt='banner' src="/banner-01.png" fill className="object-cover rounded-xl"/>
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <Card >
          <CardContent className="flex justify-between">
            
            {/*Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit rounded-xl">Confirmado</Badge>
              <h3 className="font-bold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/*Direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Junho</p>
              <p className="text-2xl">18</p>
              <p className="text-sm">15:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto mb-10 [&::-webkit-scrollbar]:hidden">
          {
            popularBarbershops.map((barbershop) => <BarberShopItem key={barbershop.id} barbershop={barbershop}/>)
          }
        </div>
        
      </div>

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
