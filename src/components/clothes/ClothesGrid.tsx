// components/ClothesGrid.tsx
import ClothesContainer from "./ClothesContainer";
import { useGetClothes } from "@/hooks/api/cloth";
import type { Cloth } from "@/models/cloth.model";
const ClothesGrid = () => {
  const { data: clothes, isLoading } = useGetClothes();

  return (
    !isLoading && (
      <div className="flex flex-wrap items-center justify-center w-full gap-4 p-4">
        {clothes!
          .slice()
          .reverse()
          .map((cloth: Cloth) => (
            <ClothesContainer
              key={cloth.id}
              clothImg={cloth.image_src}
              clothType={cloth.type}
              detail={cloth.detail}
              print={cloth.print}
              texture={cloth.texture}
              clothstyle={cloth.style}
            />
          ))}
      </div>
    )
  );
};

export default ClothesGrid;
