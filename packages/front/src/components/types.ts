export enum PropertyType {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Agricultural = 'Agricultural'
}

export enum BuildingType {
  House = 'House',
  Apartment = 'Apartment',
  CommercialBuilding = 'Commercial Building'
}

export enum ConstructionType {
  Concrete = 'Concrete',
  Wood = 'Wood',
  SteelFrame = 'Steel Frame'
}

export enum AmenityType {
  SwimmingPool = 'Swimming Pool',
  FitnessCenter = 'Fitness Center',
  Concierge = '24-Hour Concierge'
}

export interface Area {
  size: number;
  unit: string;
}

export interface Building {
  address: string;
  yearBuilt: number;
  floors: number;
  amenities: AmenityType[];
}

export interface Estate {
  // id: string;
  images: string[];
  area: number;
  building: Building;
  electricityUsage: number;
  waterUsage: number;
  propertyType: PropertyType;
  buildingType: BuildingType;
  constructionType: ConstructionType;
}
