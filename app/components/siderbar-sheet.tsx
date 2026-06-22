"use client"

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { signIn, signOut } from "next-auth/react"

const SidebarSheet = () => {
    const handleLoginWithGoogleClick = () => signIn("google")
    const handleLogoutClick = () => signOut

    return (
        <SheetContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
            <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center justify-between px-5 border-b border-solid gap-3 pb-4">
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
                
                {/* <Avatar>
                    <AvatarImage src="https://community.qlik.com/t5/image/serverpage/image-id/834i8F9315CE32CB825C/image-size/large/is-moderation-mode/true?v=v2&px=999"/>
                </Avatar>

                <div>
                    <p className="font-bold">Melque Trindade</p>
                    <p className="text-xs">melquetrindade654@gmail.com</p>
                </div> */}
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
                    <Button key={options.title} className="gap-2 justify-start" variant='ghost'>
                        <Image alt={options.title} src={options.imageURL} height={18} width={18}/>
                        {options.title}
                    </Button>
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