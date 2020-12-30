# Polkadot Donation Widget

## Install

Using CDN: Add the following script to the end of your `<head>` section.

```html
<script src="https://unpkg.com/@shardlabs/polkadot-donation-widget@latest/dist/bundle.min.js"></script>
```

## Usage

Binding the widget

```html
<script>
  polkadotDonationWidget.bind(document.body, {
    beneficiary: "14nKKuW8ZH...",
  });
</script>
```

Use custom button element

```html
<script>
  polkadotDonationWidget.bind(document.body, {
    beneficiary: "14nKKuW8ZH...",
    element: document.getElementById("my-button"),
  });
</script>
```
