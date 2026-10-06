
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetCategories, useGetHomeCommitments } from "@/api";
import { paths } from "@/routes/paths";
import { setCategory } from "@/redux/actions";

// ----------------------------------------------------------------------

const DEFAULT_SECONDARY = "#9c27b0";

// ----------------------------------------------------------------------

export function HomeSkinConcerns() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { vendor } = useAppSelector((state) => state.vendor);

    const { commitments } = useGetHomeCommitments();
    const { categories, isLoading: categoriesLoading } = useGetCategories();

    const secondaryColor = vendor?.secondary_color || DEFAULT_SECONDARY;

    const handleClick = (id) => {
        dispatch(setCategory(id));
        router.push(paths.product.root);
    };

    if (categoriesLoading) {
        return (
            <section className="flex flex-col gap-8 py-2">
                <div className="h-[300px] animate-pulse  bg-gray-100" />
            </section>
        );
    }

    const footerCategories = categories?.filter((cat) => cat.show_in_footer === true);

    return (
        <section className="flex flex-col gap-8 lg:my-6 my-2">

            {/* ── Skin Concerns ── */}
            {!!footerCategories?.length && (
                <div className="flex flex-col gap-5 mb-6 lg:mb-12">
                    {/* Header */}
                    <div className="text-center">
                        <h2
                            className="mb-1 text-[1.75rem] font-extrabold md:text-[2.5rem]"
                            style={{
                                background: `linear-gradient(135deg, ${secondaryColor} 0%, ${secondaryColor} 100%)`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Target Your Skin Concerns
                        </h2>
                        <p className="mx-auto max-w-[600px] text-gray-500">
                            Specialized solutions for every skin type and concern
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-3 px-2 sm:grid-cols-3 md:grid-cols-6 md:gap-4 md:px-0">
                        {footerCategories.map((concern, index) => (
                            <SkinConcernCard
                                key={concern.category_id}
                                concern={concern.name}
                                image={concern.web_image}
                                secondaryColor={secondaryColor}
                                index={index}
                                onClick={() => handleClick(concern.category_id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* {!!commitments?.length && (
                <div
                    className="flex flex-col gap-4 rounded-[32px] border px-3 py-6 md:px-6"
                    style={{
                        backgroundColor: "rgba(145,158,171,0.04)",
                        borderColor: "rgba(145,158,171,0.08)",
                    }}
                >
                    <div className="text-center mb-2">
                        <h3 className="mb-0 text-[1.5rem] font-bold md:text-[2rem]">
                            Our Commitments
                        </h3>
                        <p className="text-sm text-gray-500">
                            Quality you can trust, ethics you can believe in
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
                        {commitments.map((cert, index) => (
                            <CertificationCard
                                key={cert.id}
                                certification={cert}
                                secondaryColor={secondaryColor}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            )} */}

        </section>
    );
}

// ----------------------------------------------------------------------

function SkinConcernCard({ concern, image, secondaryColor, index, onClick }) {
    return (
        <>
            <div
                onClick={onClick}
                className="group flex cursor-pointer flex-col items-center gap-2 text-center transition-all duration-300 ease-in-out hover:-translate-y-3"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
                {/* Image circle */}
                <div
                    className="relative flex items-center justify-center overflow-hidden rounded-full border-4 bg-gray-100 shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110"
                    style={{ width: 160, height: 160, borderColor: `${secondaryColor}50` }}
                >
                    <Image
                        src={image}
                        alt={concern}
                        title={concern}
                        width={152}
                        height={152}
                        className="h-full w-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${secondaryColor}10 0%, transparent 100%)` }}
                    />
                </div>

                {/* Title */}
                <h4
                    className="text-sm font-semibold text-gray-900 transition-colors duration-300 md:text-base"
                    onMouseEnter={(e) => { e.currentTarget.style.color = secondaryColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
                >
                    {concern}
                </h4>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}

// ----------------------------------------------------------------------

// function CertificationCard({ certification, secondaryColor, index }) {
//     return (
//         <>
//             <div
//                 className="group flex cursor-pointer flex-col items-center gap-2 text-center transition-all duration-300 ease-in-out hover:-translate-y-2"
//                 style={{ animation: `fadeInScale 0.6s ease-out ${index * 0.1}s both` }}
//             >
//                 <div
//                     className="flex items-center justify-center rounded-full border-2 shadow-md transition-all duration-300 ease-in-out group-hover:rotate-6 group-hover:scale-110"
//                     style={{
//                         width: 100,
//                         height: 100,
//                         borderColor: secondaryColor,
//                         backgroundColor: `${secondaryColor}08`,
//                     }}
//                 >
//                     <Image
//                         src={certification.featured_image}
//                         alt={certification.title}
//                         title={certification.title}
//                         width={64}
//                         height={64}
//                         className="h-full w-full object-contain p-2"
//                     />
//                 </div>
//             </div>

//             <style jsx>{`
//         @keyframes fadeInScale {
//           from { opacity: 0; transform: scale(0.8); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//         </>
//     );
// }