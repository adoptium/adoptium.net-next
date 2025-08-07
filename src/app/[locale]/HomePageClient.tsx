import HeroSection from '@/components/HeroSection';
import LogoCarousel from '@/components/LogoCarousel';
import PowerOfTemurin from '@/components/PowerOfTemurin';
import DownloadCounter from '@/components/DownloadCounter';
import TemurinFeatures from '@/components/TemurinFeatures';
import WGProjects from '@/components/WGProjects';
import Testimonials from '@/components/Testimonials';
import LatestNews from '@/components/News/LatestNews';
import ContributorsHome from '@/components/Contributors/home';
import BlockAnnouncement from '@/components/BlockAnnouncement';

export default function HomePageClient({
    latestLTS,
    total_downloads
}: {
    latestLTS: number
    total_downloads: number
}) {
    return (
        <div>
            <HeroSection latestLTS={latestLTS} />
            <LogoCarousel />
            <div className='relative w-full'>
                <div className="w-full h-[1px] my-32 lg:my-16 bg-[#3E3355]"></div>
                <div className='absolute w-full top-[-64px]'>
                    <div className="border border-[#3E3355] md:rounded-lg mx-auto  w-full md:max-w-[800px] bg-purple">
                        <BlockAnnouncement />
                    </div>
                </div>
            </div>
            <PowerOfTemurin />
            <DownloadCounter total={total_downloads} />
            <TemurinFeatures />
            <WGProjects />
            <Testimonials />
            <LatestNews />
            <ContributorsHome />
        </div>
    );
}
