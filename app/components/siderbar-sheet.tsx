"use client"

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon} from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback} from "./ui/avatar"

const SidebarSheet = () => {
    const {data} = useSession()
    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut()

    console.log(`imagem: ${data?.user?.image}`)

    return (
        <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between px-5 border-b border-solid gap-3 pb-4">
                
                {data?.user ? (
                    <div className="flex items-center gap-2">
                        {/* <Avatar>
                            <AvatarImage src={data?.user?.image ?? ''} width={18} height={18}/>
                        </Avatar> */}

                        {data?.user?.image ? (
                        <Avatar>
                            <AvatarImage src={data.user.image} />
                        </Avatar>
                        ) : (
                        <Avatar>
                            <AvatarFallback>{data?.user?.name?.[0] ?? "U"}</AvatarFallback>
                        </Avatar>
                        )}

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size='icon'>
                                    <LogInIcon/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%] text-center">
                                <DialogHeader>
                                    <DialogTitle>
                                        Faça login na plataforma
                                    </DialogTitle>
                                    <DialogDescription>
                                        Conecte-se usando sua conta do Google
                                    </DialogDescription>
                                </DialogHeader>

                                <Button 
                                    variant='outline'
                                    onClick={handleLoginWithGoogleClick}
                                    className="gap-2 font-bold">
                                    <Image alt="google" src='/google.svg' width={18} height={18}/>
                                    Google
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                
            </div>

            <div className="px-5 flex flex-col gap-2 border-b border-solid pb-5">
                <Button asChild className="gap-2 justify-start" variant='ghost'>
                    <SheetClose asChild>
                        <Link href='/'>
                            <HomeIcon size={18}/>
                            Inicio
                        </Link>
                    </SheetClose>
                </Button>
                <Button className="gap-2 justify-start" variant='ghost'>
                    <CalendarIcon size={18}/>
                    Agendamento
                </Button>
            </div>

            <div className="px-5 flex flex-col gap-2 border-b border-solid pb-5">
                {quickSearchOptions.map((options) => (
                    <SheetClose asChild key={options.title}>
                        <Button asChild className="gap-2 justify-start" variant='ghost'>
                            <Link href={`/barbershops?service=${options.title}`}>
                                <Image alt={options.title} src={options.imageURL} height={18} width={18}/>
                            {options.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>

            <div className="px-5 flex flex-col gap-2 border-b border-solid pb-5">
                <Button className="py-5 justify-start gap-2" onClick={handleLogoutClick}>
                    <LogOutIcon size={18}/>
                    Sair da conta
                </Button>
            </div>
        </SheetContent>
    );
}
 
export default SidebarSheet;