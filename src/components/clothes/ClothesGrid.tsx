// components/ClothesGrid.tsx
import ClothesContainer from "./ClothesContainer";
import { useGetClothes } from "@/hooks/api/cloth";
import type { Cloth } from "@/models/cloth.model";
const ClothesGrid = () => {
  const { data: clothes, isLoading, isError } = useGetClothes();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !clothes) {
    return <div>의류 데이터를 가져오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-4 p-4">
      {clothes
        .slice()
        .reverse()
        .map((cloth: Cloth) => (
          <ClothesContainer
            key={cloth.id}
            clothImg={cloth.image_src}
            clothType={cloth.type}
          />
        ))}
    </div>
  );
};

export default ClothesGrid;
