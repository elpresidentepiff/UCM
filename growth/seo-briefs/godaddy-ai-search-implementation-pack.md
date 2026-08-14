# GoDaddy Implementation Pack — UCM SEO + AI Search

## Purpose

Implement UCM's SEO and AI-search foundations without redesigning the site.

## Important

This pack is for `ucmservices.co.uk` and the main UCM website/repository. It is separate from the UCM Agent application.

## Homepage Changes

### H1

Commercial Cleaning, Damp & Mould Remediation & Property Maintenance in London

### Intro

UCM Services provides commercial and specialist cleaning, damp and mould remediation, responsive maintenance, void works and property renovation across London. We support businesses, landlords, property managers, housing providers and public-sector organisations with reliable, documented and responsive property services.

### Entity paragraph

UCM Services — Universal Cleaning & Maintenance Services — is a London-based cleaning, maintenance and property-services contractor. Our services include commercial cleaning, specialist and technical cleaning, responsive property maintenance, damp and mould treatment and remediation, void property cleaning and works, Decent Homes works and property renovation. We operate across London and provide planned and responsive services for commercial properties, residential properties, landlords, property managers and housing providers.

### Title

Commercial Cleaning, Damp & Mould Remediation & Property Maintenance London | UCM Services

### Meta description

UCM Services provides commercial cleaning, specialist cleaning, damp and mould remediation, responsive maintenance, void works and property services across London.

## Quick Answers To Add Visibly

### Who are UCM Services?

UCM Services, or Universal Cleaning & Maintenance Services, is a London-based contractor providing commercial and specialist cleaning, property maintenance, damp and mould remediation, responsive works and property renovation.

### Does UCM provide damp and mould remediation in London?

Yes. UCM provides damp and mould treatment and remediation services in London, including inspection-led treatment, cleaning, remedial works and photographic evidence where required and within the agreed scope.

### Does UCM work with housing associations and social landlords?

UCM's cleaning, responsive maintenance, damp and mould, void and property services are available for housing providers, landlords, property managers and public-sector organisations across London.

### Can UCM support damp and mould response under Awaab's Law?

UCM provides damp and mould remediation and associated property works that can support social landlords in responding to damp and mould hazards. Scope, response times and documentation should be agreed to meet each landlord's statutory obligations, procedures and service requirements.

## New Pages To Build First

### 1. Damp & Mould Remediation London

Use the finished copy in:

`growth/seo-briefs/damp-mould-remediation-london.md`

### 2. Social Housing Cleaning & Maintenance London

Use the finished copy in:

`growth/seo-briefs/social-housing-maintenance-london.md`

### Existing briefs already in repo

- `growth/seo-briefs/commercial-cleaning-london.md`
- `growth/seo-briefs/office-cleaning-london.md`

## Next Pages Recommended

- Void Cleaning & Void Works London
- Responsive Property Maintenance London
- Specialist / Technical Cleaning London
- Decent Homes Works London
- Property Renovation London

## robots.txt

Inspect the current file first. Do not overwrite existing valid directives blindly.

Ensure legitimate discovery crawlers are not blocked. Suggested additions if compatible:

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://www.ucmservices.co.uk/sitemap.xml
```

Also verify that bot-protection, CDN or firewall rules do not separately block legitimate crawlers.

## XML Sitemap

Please confirm:

- sitemap is live
- canonical service pages are included
- useful case studies are included
- useful resource/article pages are included
- duplicate/utility URLs are excluded where appropriate
- canonical URLs are correct
- sitemap is referenced in robots.txt

Enable IndexNow if supported by the platform.

## Organization JSON-LD

Verify every business detail before publishing.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ucmservices.co.uk/#organization",
  "name": "Universal Cleaning & Maintenance Services",
  "alternateName": "UCM Services",
  "url": "https://www.ucmservices.co.uk/",
  "logo": "PASTE-UCM-LOGO-URL-HERE",
  "telephone": "+44 20 3832 8008",
  "email": "info@ucmservices.co.uk",
  "foundingDate": "1994",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kemp House, 128 City Road",
    "addressLocality": "London",
    "postalCode": "EC1V 2NX",
    "addressCountry": "GB"
  },
  "areaServed": {
    "@type": "City",
    "name": "London"
  },
  "description": "UCM Services is a London cleaning, maintenance and property services contractor providing commercial cleaning, specialist cleaning, responsive property maintenance, damp and mould remediation, void works, Decent Homes works and property renovation."
}
</script>
```

Use page-specific `Service` structured data on each service page. Only add structured claims that are true and verifiable.

## Internal Linking

Every major service page should link naturally to related pages.

Examples:

Damp & Mould → Social Housing → Responsive Maintenance → Void Works → Specialist Cleaning → Contact

Commercial Cleaning → Office Cleaning → Specialist Cleaning → Property Maintenance → Contact

## Evidence / Trust Content

Use genuine UCM proof wherever available:

- case studies
- real project photographs
- approved client names/logos
- company history
- current accreditations
- training and competency
- RAMS / health and safety systems
- sustainability practices
- testimonials with permission
- before/after photographic evidence

Do not invent awards, response times, accreditations, clients or contract history.

## Design Rule

Preserve the current UCM visual identity. This project is primarily:

- content architecture
- search-engine clarity
- AI-answer clarity
- metadata
- crawlability
- structured data
- internal linking
- proof

It is not a request for a wholesale visual redesign.

## Acceptance Checklist

Before sign-off, confirm:

- [ ] Homepage H1 updated
- [ ] Homepage meta title and description updated
- [ ] Entity paragraph visible
- [ ] Quick Answers visible
- [ ] Damp & Mould page live and indexable
- [ ] Social Housing page live and indexable
- [ ] OAI-SearchBot not blocked
- [ ] Bingbot not blocked
- [ ] Googlebot not blocked
- [ ] Sitemap valid
- [ ] Sitemap referenced in robots.txt
- [ ] Organization JSON-LD valid
- [ ] Service schema applied appropriately
- [ ] Internal links added
- [ ] No fabricated claims
- [ ] Mobile pages readable and fast
