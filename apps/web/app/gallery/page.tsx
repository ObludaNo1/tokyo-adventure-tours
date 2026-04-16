"use client";

import { Title } from "@/components/headers";
import Image from "next/image";

const images = [
  "bamboo_grove_00",
  "emperors_palace_00",
  "emperors_palace_01",
  "emperors_palace_02",
  "government_building_00",
  "government_building_night_projection_00",
  "government_building_observatory_night_view_00",
  "government_building_observatory_view_00",
  "government_building_square_00",
  "gundam_robot_01",
  "hama_rikyu_gardens_00",
  "harajuku_rooftop_garden_observatory_night_00",
  "ito_tokaikan_00",
  "ito_tokoikan_01",
  "ito_tokoikan_night_00",
  "izu_coast_00",
  "izu_coast_01",
  "izu_coast_02",
  "izu_coast_03",
  "izu_coast_beach_staircase_00",
  "izu_coast_hanging_bridge_00",
  "izu_coast_observatory_00",
  "jinja_square_00",
  "kawazu_waterfalls_large_00",
  "kawazu_waterfalls_stairway_00",
  "koishikawa_korakuen_gardens__00",
  "meiji_shrine_gate_00",
  "morning_ocean_view_00",
  "old_temple_00",
  "sake_barrels_00",
  "sakura_00",
  "sakura_01",
  "sakura_02",
  "shibuya_crossing_night_rain_00",
  "shibuya_scramble_00",
  "shibuya_scramble_01",
  "shinjuku_omoide_yokocho_memory_lane_00",
  "shinjuku_scyscrapesr_00",
  "shuzenji_historical_building_00",
  "tokyo_park_00",
  "tokyo_sky_tree_through_sakura_in_night_00",
  "waterlily_00",
];

export default function PhotoGallery() {
  return (
    <div className="flex flex-col gap-16">
      <Title>What you can see on our tours</Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {images.map((image) => (
          <div
            key={image}
            className="relative w-full overflow-hidden rounded-lg aspect-[16/13]"
          >
            <Image
              src={`/images/${image}.webp`}
              alt={image.replace(/_/g, " ")}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
