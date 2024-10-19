import { Shell } from "@/components/utils/shell";
import SiteFooter from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

interface LobyLayoutProps
    extends React.PropsWithChildren<{
        modal: React.ReactNode;
    }> {}

export default async function LobbyLayout({ children, modal }: LobyLayoutProps) {
    return (
        <Shell>
            <SiteHeader />
            <main className="flex-1">
                {children}
                {modal}
            </main>
            <SiteFooter />
        </Shell>
    );
}
