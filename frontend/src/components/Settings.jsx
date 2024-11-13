// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    profileVisibility: 'public',
    password: '',
  });

  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    // Save settings to the database or local storage here
  };

  return (
    <Container className="mt-4">
      <h3>Settings</h3>
      
      {/* Dark Mode Toggle */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Appearance</Card.Title>
          <Form.Check
            type="switch"
            id="dark-mode-switch"
            label="Dark Mode"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
        </Card.Body>
      </Card>

      {/* Profile Settings */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Profile Settings</Card.Title>
          <Form.Group controlId="profileVisibility">
            <Form.Label>Profile Visibility</Form.Label>
            <Form.Control
              as="select"
              name="profileVisibility"
              value={settings.profileVisibility}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Notifications */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Notifications</Card.Title>
          <Form.Check
            type="checkbox"
            id="notifications"
            label="Enable Email Notifications"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </Card.Body>
      </Card>

      {/* Change Password */}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Change Password</Card.Title>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="password"
              value={settings.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Save Button */}
      <Button variant="primary" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </Container>
  );
};

export default Settings;
