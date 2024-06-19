

import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ConciergeIcon from '@mui/icons-material/Person';
import { AmenityType } from '../config/types';

export const amenityIcons: Record<AmenityType, JSX.Element> = {
  [AmenityType.SwimmingPool]: <PoolIcon />,
  [AmenityType.FitnessCenter]: < FitnessCenterIcon />,
  [AmenityType.Concierge]: <ConciergeIcon />
};

export const mapAmenitiesToIcons = (amenities: AmenityType[]) => {
  return amenities.map(amenity => ({
    icon: amenityIcons[amenity],
    text: amenity
  }));
};
