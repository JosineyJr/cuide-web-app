import { Regional } from './regional.model';
import { Segment } from './segment.model';
import { ServiceType } from './service-type.model';

export interface Place {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  website: string;
  observations: string;
  google_maps_link: string;
  google_maps_embed_link: string;
  admission_criteria: string;
  reference_ways: string;
  attendance_types: string;
  service_type: ServiceType;
  segment: Segment;
  regionals: Array<Regional>;
}

export interface PlaceList {
  metadata: { pages: number; total_places: number };
  places: Array<Place>;
}
