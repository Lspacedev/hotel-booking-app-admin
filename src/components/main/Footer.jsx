function Footer() {
  return (
    <div className="footer">
      <div className="footer-info">
        <div className="footer-logo">
          <img src="/images/logo-icon4.png" className="logo-icon-img" />
          <img src="/images/logo-text.png" className="logo-text-img" />
        </div>
        <div className="support-section">
          <div className="support-h">Support</div>
          <div className="support-links">
            <a href="#">Overview</a>
            <a href="#">Pricing</a>
            <a href="#">Marketplace</a>
          </div>
        </div>
        <div className="company-section">
          <div className="company-h">Company</div>
          <div className="company-links">
            <a href="#">About</a>
            <a href="#">Team</a>
          </div>
        </div>
        <div className="connect-section">
          <div className="connect-h">Connect</div>
          <div className="connect-links">
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
