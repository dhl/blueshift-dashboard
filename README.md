This is the frontend for [Blueshift](https://learn.blueshift.gg).

## Development

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Courses and challenges are located in the `src/app/content` directory.

- Courses are located in `src/app/content/courses`
- Challenges are located in `src/app/content/challenges`

## Content Translation

Blueshift supports multiple languages to make Solana education accessible worldwide. Our automated translation
workflow ensures that content updates are consistently translated across all supported languages.

### Supported Languages

- **French** (`fr`)
- **Vietnamese** (`vi`)
- **Simplified Chinese** (`zh-CN`)
- **Traditional Chinese** (`zh-HK`)
- **Indonesian** (`id`)

### How Translation Works

When English content is updated and merged to `master`, our GitHub Actions
[translation workflow](.github/workflows/translation.yaml) automatically creates translation issues for each
supported language. The workflow monitors changes to:

- **UI Messages**: `messages/en/*.json` - Interface text and labels
- **Challenge Content**: `src/app/content/challenges/*/en/*.mdx` - Challenge descriptions and instructions
- **Challenge Pages**: `src/app/content/challenges/*/en/pages/*.mdx` - Individual challenge pages
- **Course Content**: `src/app/content/courses/*/*/en.mdx` - Course lessons and materials

### Contributing to Translations

Translation issues are automatically labeled with `translation` and `help wanted` to make them easy to find. Each issue
includes:

- Step-by-step instructions for setting up the translation branch
- Commands for running AI-assisted translation using [lingo.dev](https://lingo.dev)
- Guidelines for reviewing and improving AI translations
- Instructions for creating a pull request

Help us make Solana education accessible in your native language!

For details about the automated workflow implementation, see `.github/workflows/translation.yaml`.
