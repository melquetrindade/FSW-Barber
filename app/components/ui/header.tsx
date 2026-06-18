import { MenuIcon } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import Image from "next/image"

const Header = () => {
    return (
        <Card className="rounded-none ring-0">
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt='FSW Barber' src="/logo.png" height={18} width={120} ></Image>
                <Button size='icon' variant='outline'>
                    <MenuIcon>

                    </MenuIcon>
                </Button>
            </CardContent>
        </Card>
    )
}

export default Header