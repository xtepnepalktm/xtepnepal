import React from 'react';
import { useAppDispatch } from "@/redux/hooks";
import { setCategory } from "@/redux/actions";
import { paths } from '@/routes/paths';
import { useRouter } from "@/routes/hooks";

export function HomePremium({ categories }) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleClick = (id) => {
        if (!id) return;
        dispatch(setCategory(id));
        router.push(paths.product.root);
    };

    const visibleCategories = categories?.filter((c) => c.show_in_home === true && c.show_in_footer === true) ?? [];

    if (visibleCategories.length === 0) {
        return null; // Do not render section if there are no matching categories
    }

    return (
        <section className="py-8 md:py-16 px-3 md:px-5 lg:px-5 container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 mx-auto max-w-[2000px]">

                {visibleCategories.map((category, index) => (
                    <div
                        key={category.category_id}
                        onClick={() => handleClick(category.category_id)}
                        className="relative group overflow-hidden bg-black min-h-[250px] md:min-h-[600px] lg:min-h-[750px] flex flex-col items-center justify-end cursor-pointer"
                    >
                        {/* Image */}
                        <img
                            src={category.web_image || "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop"}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        {/* Gradient Overlay for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40 pointer-events-none transition-opacity duration-500" />

                        {/* Content (Bottom) */}
                        <div className="relative z-10 flex flex-col items-center pb-24 lg:pb-32 w-full transition-transform duration-500 group-hover:-translate-y-4">
                            <h2 className="text-white text-lg sm:text-4xl md:text-5xl font-black uppercase tracking-[0.15em] lg:mb-8 mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
                                {category.name}
                            </h2>
                            <button
                                className="border-[1.5px] border-white text-white lg:px-10 lg:py-3.5 px-4 py-2 text-sm font-semibold tracking-[0.2em] transition-all duration-300 group-hover:bg-white group-hover:text-black backdrop-blur-sm"

                            >
                                Browse
                            </button>
                        </div>

                        {/* Overlaid Large Text - Added conditionally to the first card like the original design */}
                        {index === 0 && (
                            <div className="absolute bottom-6 left-0 w-full text-center z-10 px-4 overflow-hidden pointer-events-none">
                                <h3
                                    className="text-white/30 text-[3rem] sm:text-[4rem] md:text-[3rem] lg:text-[5rem] font-black italic tracking-tighter uppercase whitespace-nowrap leading-none mix-blend-overlay"
                                    style={{ transform: 'scaleY(1.3)' }}
                                >
                                    MAKE IT DIFFERENT
                                </h3>
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </section>
    );
}
