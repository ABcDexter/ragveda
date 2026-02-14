# Contributing to Ragveda

Thank you for considering contributing to Ragveda! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

- Use the GitHub issue tracker
- Include detailed steps to reproduce
- Mention your environment (OS, Python version, Node version)

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/ABcDexter/ragveda.git
cd ragveda

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend setup (in new terminal)
cd frontend
npm install
```

## Code Style

### Python (Backend)
- Follow PEP 8 guidelines
- Use type hints where appropriate
- Add docstrings for functions and classes
- Keep functions focused and small

### JavaScript/React (Frontend)
- Use functional components with hooks
- Follow consistent naming conventions
- Add comments for complex logic
- Keep components small and reusable

## Testing

Before submitting a PR:

### Backend Tests
```bash
cd backend
python -m pytest  # When tests are added
```

### Frontend Tests
```bash
cd frontend
npm test  # When tests are added
```

## Areas for Contribution

### High Priority
- [ ] Add unit tests for backend
- [ ] Add component tests for frontend
- [ ] Improve error handling
- [ ] Add loading states and better UX
- [ ] Support for more Indian philosophy texts

### Medium Priority
- [ ] LLM integration (OpenAI, Anthropic)
- [ ] Persistent vector database
- [ ] User authentication
- [ ] Conversation history
- [ ] Export chat history

### Low Priority
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced search filters
- [ ] Voice input/output
- [ ] Mobile app version

## Documentation

Help improve documentation:
- Fix typos and unclear explanations
- Add examples and use cases
- Create tutorials
- Improve API documentation

## Questions?

Feel free to open an issue for:
- Feature requests
- Questions about the codebase
- Suggestions for improvements

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

Thank you for contributing! 🙏
