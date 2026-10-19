/**
 * STC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "STC01",
  "fullName": "St Clair Cannabis Dispensary Weed Delivery",
  "street": "875 St Clair Ave W",
  "city": "Toronto",
  "region": "ON",
  "postal": "M6C 1C4",
  "phoneDisplay": "(437) 783-2483",
  "phoneTel": "tel:+14377832483",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJ_XEXu-83K4gRPYwmtch7b_8",
  "placeId": "ChIJ_XEXu-83K4gRPYwmtch7b_8",
  "neighbourhood": "St Clair West",
  "intersection": "",
  "transit": "Accessible via the 512 St. Clair streetcar and local TTC transit routes.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
