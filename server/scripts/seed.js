const Resource = require('../models/Resource');
const Report = require('../models/Report');
const Story = require('../models/Story');
const Contact = require('../models/Contact');

async function seed() {
  // Sync all models first
  await Resource.sync({ force: true });
  await Report.sync({ force: true });
  await Story.sync({ force: true });
  await Contact.sync({ force: true });

  await Resource.bulkCreate([
    {
      name: 'City General Hospital',
      type: 'Hospital',
      description: '24/7 Emergency Services and specialized care for assault victims.',
      address: '123 Main St, Nairobi',
      phone: '+254 700 000001',
      latitude: -1.286389,
      longitude: 36.817223,
    },
    {
      name: 'Safe Haven Shelter',
      type: 'Shelter',
      description: 'Temporary housing for women and children escaping violence.',
      address: '456 Safe Lane, Nairobi',
      phone: '+254 700 000002',
      latitude: -1.2921,
      longitude: 36.8219,
    },
    {
      name: 'Hope Therapy Center',
      type: 'Therapy',
      description: 'Free counseling and psychological support.',
      address: '789 Healing Rd, Nairobi',
      phone: '+254 700 000003',
      latitude: -1.2750,
      longitude: 36.8050,
    },
    {
        name: 'Central Police Station',
        type: 'Police',
        description: 'Report crimes and seek immediate protection.',
        address: '101 Law Ave, Nairobi',
        phone: '999',
        latitude: -1.2830,
        longitude: 36.8100,
      },
  ]);

  await Story.bulkCreate([
    {
      title: 'Finding My Voice',
      content: 'It took me years to speak up, but finding a support group changed everything...',
      authorAlias: 'Jane Doe',
      isApproved: true,
    },
    {
      title: 'A New Beginning',
      content: 'Leaving was the hardest part, but the shelter gave me the safety I needed to rebuild.',
      authorAlias: 'Survivor254',
      isApproved: true,
    },
  ]);

  await Contact.bulkCreate([
    {
      name: 'National GBV Helpline',
      role: 'Helpline',
      phone: '1195',
    },
    {
      name: 'Police Emergency',
      role: 'Emergency',
      phone: '999',
    },
  ]);

  // Seed some initial reports for the dashboard
  // Using hardcoded dates for simplicity in this prototype
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;

  await Report.bulkCreate([
      { type: 'Physical', description: 'Domestic violence incident', latitude: -1.29, longitude: 36.82, timestamp: new Date(now - day), isAnonymous: true },
      { type: 'Sexual', description: 'Harassment in public transport', latitude: -1.28, longitude: 36.81, timestamp: new Date(now - 2 * day), isAnonymous: true },
      { type: 'Emotional', description: 'Verbal abuse and threats', latitude: -1.30, longitude: 36.83, timestamp: new Date(now - 3 * day), isAnonymous: true },
      { type: 'Physical', description: 'Assault at home', latitude: -1.285, longitude: 36.815, timestamp: new Date(), isAnonymous: true },
  ]);

  console.log('Database seeded successfully.');
}

module.exports = seed;
