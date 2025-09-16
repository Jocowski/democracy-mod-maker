# Democracy 4 - Mod Maker

An unofficial web application for exploring and understanding Democracy 4's data structure to help with creating custom mods.

## 🎮 About

This application provides a user-friendly interface to browse and analyze the game data from Democracy 4, including policies, dilemmas, and other game elements. It's designed to help modders understand the game's structure and create better custom content.

## ⚠️ Important Notice

This is an **unofficial application** and is not affiliated with, endorsed by, or connected to Positech Games or Democracy 4. All game data displayed here belongs to Positech Games.

## 🚀 Features

- 📊 **Policies Management**: Create, edit, and manage custom policies with full configuration options
- 🎯 **Official Game Data**: Browse all official policies and dilemmas with detailed information
- 🌍 **Multilingual Support**: Support for 12 languages including English, Portuguese, Spanish, French, German, and more
- 🔍 **Search and Filter**: Advanced search and filtering capabilities for game data
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with beautiful styling

## 🛠️ Technology Stack

- **Frontend**: React.js
- **UI Library**: Ant Design
- **Styling**: CSS3 with modern features
- **Build Tool**: Webpack
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/democracy-mod-maker.git
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
│   └── ResizableTable.js
├── pages/              # Main application pages
│   ├── Home.js         # Welcome page
│   ├── Policies.js     # Policy management
│   └── OfficialGameData.js # Game data browser
├── App.js              # Main application component
└── App.css             # Global styles

public/
├── data/               # Game data files
│   └── simulation/
│       ├── policies.csv
│       ├── sliders.csv
│       └── dilemmas/
└── translations/       # Translation files
    └── English/
```

## 🎯 Usage

### Policy Management
- Navigate to the "Policies" tab
- Use the "Data" tab to configure policy properties (costs, income, behavior)
- Use the "Translations" tab to add multilingual support
- Create, edit, or delete policies as needed

### Official Game Data
- Browse existing game policies and dilemmas
- Search and filter through the data
- Understand the structure for modding purposes

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

- [Democracy 4 on Steam](https://store.steampowered.com/app/1410710/Democracy_4/)
- [Positech Games](https://positech.co.uk/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Disclaimer**: This application is not officially associated with Democracy 4 or Positech Games. It's created by the community for the community.
