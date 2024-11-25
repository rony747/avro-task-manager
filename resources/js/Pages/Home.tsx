import AssetRow from "@/Components/AssetRow";
import Chart from "@/Components/Chart";
import Card from "@/Components/ui/Card";
import Tag from "@/Components/ui/Tag";
import TokenCard from "@/Components/ui/TokenCard";
import PageLayout from "@/Layouts/PageLayout";
import { usePage } from "@inertiajs/react";
import {Eye, FilePenLine, Flame, RefreshCcw, Trash2} from "lucide-react";
import Heading from "@/Components/ui/Heading";

export default function Home() {
    const user = usePage().props.auth.user;

    return (
        <PageLayout>
            <div className="xl:grid lg:grid-cols-2 xl:grid-cols-3 md:gap-6 mb-6 gap-y-4 flex flex-col">
                <Card className="xl:col-span-2">
                    <div className="flex items-center justify-between mb-4">

                        <Heading>  Eth/USDT</Heading>
                        <div className="flex justify-start items-center gap-2 text-sm flex-row flex-wrap">
                            <Tag>Buy</Tag>
                            <Tag>Sell</Tag>
                        </div>
                    </div>
                    <Chart />
                </Card>

                <Card>
                   <Heading> Type of tokens in my portfolio</Heading>
                    <div className="flex justify-start items-center mb-4 gap-2 text-sm flex-row flex-wrap">
                        <Tag>All market</Tag>
                        <Tag> Crypto</Tag>
                        <Tag>USDT</Tag>
                        <Tag>BNB</Tag>
                    </div>

                    <div className="flex flex-col gap-3">
                        <TokenCard
                            amount={7500}
                            symbol="Xlm"
                            value="17,600.65"
                            icon={<Flame size={20} className="text-white" />}
                        />
                        <TokenCard
                            amount={4377}
                            symbol="Huobi"
                            value="25,380.55"
                            icon={
                                <RefreshCcw size={20} className="text-white" />
                            }
                        />
                        <TokenCard
                            amount={2200}
                            symbol="Okb"
                            value="1,498.37"
                            icon={
                                <RefreshCcw size={20} className="text-white" />
                            }
                        />
                    </div>
                </Card>
            </div>

            <Card>
                <div className="flex md:items-center justify-between md:flex-row flex-col items-start mb-6 gap-3">

                    <Heading>Assets</Heading>
                    <div className="flex justify-start items-center gap-2 text-sm flex-row flex-wrap ">
                        <button className="px-4 py-1.5 bg-[#2C2C2E] text-white rounded-lg hover:scale-105 transition-all duration-300">
                            My assets
                        </button>
                        <Tag>My assets</Tag>
                        <Tag>Categories</Tag>
                        <Tag>Hot</Tag>
                        <Tag>New listed</Tag>
                    </div>
                </div>

                <div className="space-y-2">
                    <AssetRow
                        icon={<RefreshCcw size={16} className="text-white" />}
                        name="Stellar"
                        symbol="Xml"
                        price="10.31"
                        change="11.94"
                        volume="507.2"
                        chart={<div className="h-8 bg-[#2C2C2E] rounded" />}
                    />
                    <AssetRow
                        icon={<RefreshCcw size={16} className="text-white" />}
                        name="Hedera"
                        symbol="Hbar"
                        price="23.47"
                        change="9.47"
                        volume="37.2"
                        chart={<div className="h-8 bg-[#2C2C2E] rounded" />}
                    />
                    <AssetRow
                        icon={<RefreshCcw size={16} className="text-white" />}
                        name="Cardano"
                        symbol="Ada"
                        price="0.40"
                        change="4.13"
                        volume="14.6"
                        chart={<div className="h-8 bg-[#2C2C2E] rounded" />}
                    />
                </div>
            </Card>
        </PageLayout>
    );
}
