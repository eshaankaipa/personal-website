# Personal Website Template

A sleek, modernist personal website template inspired by contemporary design trends. Features a dark/light theme toggle, smooth animations, and responsive design.

## Features

- **Modern Design**: Clean, minimalist aesthetic with smooth animations
- **Theme Toggle**: Switch between dark and light themes with persistent preferences
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Scrolling**: Elegant navigation with smooth scrolling between sections
- **Interactive Elements**: Hover effects and micro-interactions throughout
- **Performance Optimized**: Fast loading with optimized CSS and JavaScript

## File Structure

```
personal-website/
├── index.html          # Main HTML structure
├── styles.css          # All styling and theme definitions
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization Guide

### 1. Personal Information

Edit the following in `index.html`:

- **Name**: Replace "Your Name" throughout the file
- **Title**: Update the `<title>` tag
- **Hero Section**: Modify the greeting, subtitle, and description
- **About Section**: Update your personal description and skills
- **Contact Information**: Replace email, GitHub, and LinkedIn links

### 2. Projects Section

For each project card in the projects section:

1. Replace "Project Name" with your actual project name
2. Update the project description
3. Add real project images (replace the placeholder divs)
4. Update the "Live Demo" and "GitHub" links

### 3. Skills & Technologies

In the skills section, update the skill tags to match your expertise:

```html
<div class="skill-tags">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
    <!-- Add more skills as needed -->
</div>
```

### 4. Contact Information

Update the contact links with your actual information:

```html
<a href="mailto:your.actual.email@example.com" class="contact-link">
    <span class="contact-icon">✉️</span>
    your.actual.email@example.com
</a>
<a href="https://github.com/your-actual-username" class="contact-link">
    <span class="contact-icon">📱</span>
    GitHub
</a>
<a href="https://linkedin.com/in/your-actual-username" class="contact-link">
    <span class="contact-icon">💼</span>
    LinkedIn
</a>
```

### 5. Adding Your Photo

Replace the hero image placeholder with your actual photo:

```html
<div class="hero-visual">
    <img src="path/to/your/photo.jpg" alt="Your Name" class="hero-image">
</div>
```

Then add the corresponding CSS:

```css
.hero-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 1rem;
    box-shadow: var(--shadow-heavy);
}
```

### 6. Project Images

For each project, replace the placeholder with actual project screenshots:

```html
<div class="project-image">
    <img src="path/to/project-image.jpg" alt="Project Name" class="project-img">
</div>
```

Add CSS for project images:

```css
.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 7. Color Customization

The website uses CSS custom properties for easy color customization. Edit the color variables in `styles.css`:

```css
:root {
    --accent-primary: #3b82f6;    /* Main accent color */
    --accent-secondary: #1e40af;  /* Secondary accent color */
    /* ... other colors */
}
```

### 8. Font Customization

The website uses Inter font by default. To change fonts:

1. Update the Google Fonts link in `index.html`
2. Modify the font-family in `styles.css`:

```css
body {
    font-family: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

## Deployment

### Option 1: GitHub Pages

1. Create a new GitHub repository
2. Upload your website files
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose your main branch
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify

1. Create a Netlify account
2. Drag and drop your website folder to Netlify
3. Your site will be deployed instantly with a custom URL

### Option 3: Vercel

1. Create a Vercel account
2. Connect your GitHub repository
3. Deploy with one click

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Optimize Images**: Compress images before adding them to your site
2. **Minimize HTTP Requests**: Combine CSS and JS files if possible
3. **Use WebP Format**: Convert images to WebP for better compression
4. **Lazy Loading**: Consider implementing lazy loading for images

## Custom Features

### Adding a Blog Section

1. Create a new section in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links

### Adding a Resume Download

Add a download button in the hero section:

```html
<a href="path/to/resume.pdf" class="btn btn-secondary" download>Download Resume</a>
```

### Adding Social Media Links

Add more social media links in the contact section:

```html
<a href="https://twitter.com/yourusername" class="contact-link">
    <span class="contact-icon">🐦</span>
    Twitter
</a>
```

## Troubleshooting

### Theme Toggle Not Working
- Check that `script.js` is properly linked in `index.html`
- Ensure the theme toggle button has the correct ID (`themeToggle`)

### Images Not Loading
- Verify image paths are correct
- Check that images are in the same directory or update paths accordingly

### Styling Issues
- Clear browser cache
- Check for CSS syntax errors
- Ensure all CSS files are properly linked

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## Support

If you encounter any issues or need help customizing the template, feel free to reach out or create an issue in the repository.

---

**Happy coding! 🚀**
