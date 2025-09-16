# Democracy 4 - Mod Maker

A comprehensive unofficial web application for creating, managing, and exporting custom mods for Democracy 4. Features advanced policy management, multilingual support, and professional-grade modding tools.

## 🎮 About

This application provides a comprehensive, professional-grade interface for creating and managing Democracy 4 mods. From policy creation and multilingual translations to mod export and data analysis, it offers everything needed to create high-quality custom content for Democracy 4.

## ⚠️ Important Notice

This is an **unofficial application** and is not affiliated with, endorsed by, or connected to Positech Games or Democracy 4. All game data displayed here belongs to Positech Games.

## 🚀 Features

- 📊 **Advanced Policy Management**: Create, edit, and delete custom policies with comprehensive configuration options including costs, income, implementation time, and behavioral settings
- 🎯 **Official Game Data Browser**: Explore all official policies, dilemmas, sliders, and simulation data with advanced search and filtering
- 🌍 **Multilingual Support**: Full support for 12 languages including English, Portuguese, Spanish, French, German, Italian, Russian, Polish, Chinese, Japanese, Korean, and Arabic
- 🔍 **Advanced Search & Filters**: Powerful search and filtering capabilities across all data types with real-time results
- 📦 **Mod Export System**: Export your custom mods as ready-to-use ZIP files with proper folder structure
- 🎨 **Professional UI**: Modern, responsive design with beautiful styling, smooth animations, and intuitive navigation
- 📱 **Cross-Platform**: Works seamlessly on desktop, tablet, and mobile devices with responsive design
- ⚡ **Real-time Updates**: Instant preview of changes with live data validation and error handling
- 🛠️ **Developer Tools**: Advanced table management with sorting, pagination, and bulk operations

## 🛠️ Technology Stack

- **Frontend**: React.js with modern hooks and functional components
- **UI Library**: Ant Design with custom theming and components
- **Styling**: CSS3 with modern features, responsive design, and animations
- **Build Tool**: Webpack with optimized configuration
- **Package Manager**: npm with JSZip for mod export functionality
- **Data Management**: CSV parsing and real-time data manipulation

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Jocowski/democracy-mod-maker.git
cd democracy-mod-maker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TabNavigation.js
│   ├── PoliciesTable.js
│   ├── DilemmasTable.js
│   ├── SlidersTable.js
│   └── SimulationTable.js
├── pages/              # Main application pages
│   ├── Home.js         # Welcome page
│   ├── Policies.js     # Policy management with forms
│   ├── CreateMod.js    # Mod creation and export
│   └── OfficialGameData.js # Game data browser
├── App.js              # Main application component
└── App.css             # Global styles

public/
├── data/               # Game data files
│   └── simulation/
│       ├── policies.csv
│       ├── sliders.csv
│       ├── simulation.csv
│       └── dilemmas/
└── translations/       # Translation files
    └── English/
```

## 🎯 Usage

### Policy Management
- Navigate to the "Policies" tab to access the policy management interface
- Use the "Data" tab to configure policy properties (costs, income, implementation time, behavioral settings)
- Use the "Translations" tab to add multilingual support for 12 languages
- Create, edit, or delete policies with full CRUD operations
- Use the Actions column to quickly edit or delete existing policies

### Mod Creation & Export
- Navigate to the "Create Mod" tab to access mod creation tools
- Use the "Policies" subtab to manage your custom policies
- Click "Export Mod" to generate a ready-to-use ZIP file with proper folder structure
- The exported mod follows Democracy 4's standard format for easy installation

### Official Game Data Browser
- Browse existing game policies, dilemmas, sliders, and simulation data
- Use advanced search and filtering capabilities across all data types
- Sort and paginate through large datasets for better navigation
- Understand the structure and relationships for modding purposes

## 🌐 Supported Languages

- English (required)
- Portuguese (Brazil)
- Spanish
- French
- German
- Italian
- Russian
- Polish
- Chinese
- Japanese
- Korean
- Arabic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational and modding purposes only. All game data belongs to Positech Games.

## 🔗 Links

- [GitHub Repository](https://github.com/Jocowski/democracy-mod-maker)
- [Democracy 4 on Steam](https://store.steampowered.com/app/1410710/Democracy_4/)
- [Positech Games](https://positech.co.uk/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Disclaimer**: This application is not officially associated with Democracy 4 or Positech Games. It's created by the community for the community.
