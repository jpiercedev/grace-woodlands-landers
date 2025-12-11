# Christmas at Grace - Landing Page

## Overview
A new Christmas-themed landing page has been created for Grace Church, featuring all the Christmas events and services for December 2024.

## Page URL
- **Development**: http://localhost:3000/christmas
- **Production**: https://gracewoodlands.com/christmas

## Features

### 1. Christmas Eve Services
- **Date**: Wednesday, December 24
- **Times**: 2pm & 4pm
- **Details**: Family services with children's ministry for birth-K
- **CTA**: Directions to Grace Church

### 2. Christmas Family Car Show
- **Date**: Saturday, December 13
- **Time**: 9am-12pm
- **Features**:
  - Family fun activities (Playscape, Carousel, Train)
  - Photos with Santa & Mrs. Claus
  - Food vendors
  - Show car prizes (up to $200)
  - Cash drawings for participants
- **Registration**: Available at GraceWoodlands.com
- **Contact**: carshow@gracewoodlands.com

### 3. Family Christmas Service
- **Date**: Wednesday, December 17
- **Time**: 6:45pm
- **Activities**:
  - Christmas Carol sing-along
  - Memorable stories
  - Texas-sized snowball fight
  - Christmas surprises
  - Cookies and hot cocoa after service
- **Note**: Kids in service, childcare available for birth-K

### 4. Polar Express Movie Experience
- **Date**: Friday, December 19
- **Schedule**:
  - Attractions open: 6:30pm
  - Movie begins: 7:30pm
  - Attractions until: 10pm
- **Features**:
  - Indoor & outdoor viewing
  - Hot cocoa and cookies
  - Indoor snowball fight
  - Pictures with Santa
  - Train rides, Carousel rides
  - Pre-k playland
  - Elf workshop craft area
  - Giant playscape
- **Registration**: https://gracewoodlands.com/polar-express/
- **Admission**: Free (seating limited)

## Design Elements

### Color Scheme
- **Primary Green**: #165B33 (Christmas green)
- **Primary Red**: #BB2528 (Christmas red)
- **Gradients**: Used throughout for festive feel

### Layout
- Follows the same design patterns as the main Grace Church landing page
- Responsive two-column layouts
- Video embeds for promotional content
- Scroll animations
- Sticky header navigation

### Navigation
- Quick nav pills for easy section jumping
- Mobile-responsive hamburger menu
- Links to main church website

## Files Created/Modified

### New Files
1. `app/christmas/page.tsx` - Next.js page route with metadata
2. `components/pages/ChristmasLanding.tsx` - Main Christmas landing page component

### Modified Files
1. `app/globals.css` - Added Christmas-specific styles (lines 5700-5953)

## Media Assets
The page references media from Dropbox links provided:
- Christmas Car Show video
- Family Christmas video
- Polar Express video
- Various photos from the Dropbox folders

## Next Steps

### Recommended Actions
1. **Download and optimize media**: Download videos and images from Dropbox and add them to the `/public` folder for better performance
2. **Update video sources**: Replace Dropbox links with local paths once media is downloaded
3. **Add registration forms**: Integrate actual registration forms for events (currently linking to main website)
4. **Test on mobile**: Verify responsive design on various devices
5. **SEO optimization**: Add event schema markup for better search visibility
6. **Social sharing**: Add Open Graph images specific to Christmas events

### Optional Enhancements
1. Add countdown timers for each event
2. Create a Christmas event calendar view
3. Add photo galleries from previous years
4. Include testimonials from past attendees
5. Add email signup specifically for Christmas event updates

## Technical Notes
- Built with Next.js 16.0.1
- Uses TypeScript
- Fully responsive design
- Follows accessibility best practices
- SEO-optimized with proper metadata

## Access
The page is now live at:
- **Local Development**: http://localhost:3000/christmas
- Visit the page to see all Christmas events and services!

