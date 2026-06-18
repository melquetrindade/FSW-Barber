"use client"
import { SearchIcon } from "lucide-react"
import { Button } from "./components/ui/button"
import Header from "./components/ui/header"
import { Input } from "./components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Avatar, AvatarImage } from "./components/ui/avatar"

const Home = () => {
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

        <Card className="mt-6">
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
      </div>
    </div>
    
  )
}

export default Home
