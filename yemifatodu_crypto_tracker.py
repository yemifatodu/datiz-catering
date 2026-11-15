# coin_trade_tracker.py

import streamlit as st
import pandas as pd
import requests
import pandas_ta as ta
import plotly.graph_objects as go
import time

# --- STREAMLIT CONFIG --- #
st.set_page_config(page_title="Coin Trade Tracker", layout="wide")

# --- DARK MODE CSS --- #
st.markdown("""
    <style>
        .main {
            background-color: #111;
            color: white;
        }
        .block-container {
            padding-top: 2rem;
        }
        footer {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

# --- TELEGRAM CONFIG --- #
TELEGRAM_TOKEN = "7619429959:AAEGdNbftMkctkKbQCA2cwj0wiNPh4BRGNI"
TELEGRAM_CHAT_ID = "5641448979"

def send_telegram_alert(message):
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        payload = {"chat_id": TELEGRAM_CHAT_ID, "text": message}
        requests.post(url, data=payload)
    except Exception:
        st.warning("⚠️ Failed to send Telegram alert.")

# --- COIN LIST --- #
COINS = {
    "Bitcoin": "bitcoin", "Ethereum": "ethereum", "Tether": "tether", "BNB": "binancecoin", "Solana": "solana",
    "XRP": "ripple", "USDC": "usd-coin", "Cardano": "cardano", "Dogecoin": "dogecoin", "Avalanche": "avalanche-2",
    "Shiba Inu": "shiba-inu", "Polkadot": "polkadot", "TRON": "tron", "Chainlink": "chainlink", "Toncoin": "the-open-network",
    "Polygon": "matic-network", "Wrapped Bitcoin": "wrapped-bitcoin", "Uniswap": "uniswap", "Bitcoin Cash": "bitcoin-cash",
    "Litecoin": "litecoin", "Internet Computer": "internet-computer", "Dai": "dai", "LEO Token": "leo-token", "Ethereum Classic": "ethereum-classic",
    "Cosmos Hub": "cosmos", "Filecoin": "filecoin", "NEAR Protocol": "near", "Stellar": "stellar", "OKB": "okb",
    "Monero": "monero", "Immutable": "immutable-x", "Hedera": "hedera-hashgraph", "VeChain": "vechain", "Injective": "injective-protocol",
    "Aptos": "aptos", "Arbitrum": "arbitrum", "Render": "render-token", "Stacks": "stacks", "Cronos": "crypto-com-chain",
    "Maker": "maker", "Optimism": "optimism", "Kaspa": "kaspa", "Mantle": "mantle", "The Graph": "the-graph",
    "Quant": "quant-network", "Sui": "sui", "Algorand": "algorand", "Celestia": "celestia", "Rocket Pool ETH": "rocket-pool-eth",
    "Fantom": "fantom", "THORChain": "thorchain"
}

CATEGORY_COLORS = {
    "Layer 1": "#1f77b4", "DeFi": "#ff7f0e", "Meme": "#2ca02c", "Other": "#d62728"
}

# --- SESSION STATE --- #
for key in ["previous_price", "last_trend", "last_tp_sl_status", "last_spike_price", "last_spike_time"]:
    if key not in st.session_state:
        st.session_state[key] = None if "price" in key else time.time()

# --- Sidebar Coin Selector --- #
st.sidebar.title("🧭 Coin Selector")
selected_coin_name = st.sidebar.selectbox("Select a crypto coin:", list(COINS.keys()))
selected_coin_id = COINS[selected_coin_name]

# --- Title --- #
st.title("📊 Coin Trade Tracker")
st.caption("Live signals, alerts, and trade planning tool")

# --- Price Fetch --- #
def fetch_price(coin_id):
    try:
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin_id}&vs_currencies=usd"
        data = requests.get(url).json()
        return data[coin_id]["usd"] if coin_id in data else None
    except:
        return None

price = fetch_price(selected_coin_id)

if price:
    st.metric("🔔 Current Price (USD)", f"${price:.4f}")

    # --- ATR-Based Entry, TP, SL --- #
    df_dummy = pd.DataFrame([price] * 20, columns=["close"])
    df_dummy["high"] = df_dummy["close"] * 1.01
    df_dummy["low"] = df_dummy["close"] * 0.99
    atr = ta.atr(df_dummy["high"], df_dummy["low"], df_dummy["close"], length=14).iloc[-1]

    entry = round(price - 0.5 * atr, 4)
    tp = round(entry + 1.5 * atr, 4)
    sl = round(entry - 1.0 * atr, 4)

    st.success(f"📥 Entry Point: **${entry}**")
    st.info(f"🎯 Take Profit: **${tp}**")
    st.error(f"🛑 Stop Loss: **${sl}**")

    # --- % Difference and R:R --- #
    tp_diff = ((tp - price) / price) * 100
    sl_diff = ((sl - price) / price) * 100
    rr = round((tp - price) / (price - sl), 2) if price > sl else "∞"

    st.markdown(f"""
        **📊 Price Distance:**
        - 🎯 TP: {tp_diff:.2f}%
        - 🛑 SL: {sl_diff:.2f}%
        - 📐 R:R Ratio: {rr}
    """)

    # --- Trend Detection --- #
    trend = "➡️ Sideways"
    if st.session_state.previous_price is not None:
        if price > st.session_state.previous_price:
            trend = "📈 Uptrend"
        elif price < st.session_state.previous_price:
            trend = "📉 Downtrend"
    st.write(f"**Market Trend:** {trend}")

    if trend != st.session_state.last_trend:
        send_telegram_alert(f"📊 *Trend Update* — {selected_coin_name} ➜ {trend}")
        st.session_state.last_trend = trend

    st.session_state.previous_price = price

    # --- TP/SL Alerts --- #
    if price >= tp and st.session_state.last_tp_sl_status != "tp":
        send_telegram_alert(f"✅ TP Hit! {selected_coin_name} reached ${price:.2f} 🎯 (TP was ${tp})")
        st.session_state.last_tp_sl_status = "tp"
    elif price <= sl and st.session_state.last_tp_sl_status != "sl":
        send_telegram_alert(f"🚨 SL Triggered! {selected_coin_name} dropped to ${price:.2f} ❌ (SL was ${sl})")
        st.session_state.last_tp_sl_status = "sl"
    elif entry < price < tp and price > sl:
        st.session_state.last_tp_sl_status = "none"

    # --- Fast Price Spike Alerts --- #
    now = time.time()
    if st.session_state.last_spike_price:
        time_diff = now - st.session_state.last_spike_time
        change_pct = ((price - st.session_state.last_spike_price) / st.session_state.last_spike_price) * 100
        if time_diff <= 5:
            if change_pct >= 1.5:
                send_telegram_alert(f"⚡ SPIKE: {selected_coin_name} surged {change_pct:.2f}% in {time_diff:.1f}s!")
                st.session_state.last_spike_time = now
            elif change_pct <= -1.5:
                send_telegram_alert(f"⚠️ DUMP: {selected_coin_name} dropped {abs(change_pct):.2f}% in {time_diff:.1f}s!")
                st.session_state.last_spike_time = now
    st.session_state.last_spike_price = price

    # --- Chart: Mock Line Chart + Price Bar --- #
    st.subheader("📈 Price Movement & Zones")

    # Line chart
    recent_prices = [price * (1 + i * 0.002) for i in range(-10, 1)]
    timestamps = [f"T-{10-i}min" for i in range(11)]

    fig_line = go.Figure()
    fig_line.add_trace(go.Scatter(x=timestamps, y=recent_prices, mode="lines+markers", name="Price", line=dict(color="cyan")))
    fig_line.update_layout(template="plotly_dark", height=300, title="Simulated Price Action")
    st.plotly_chart(fig_line, use_container_width=True)

    # Price bar chart
    fig_bar = go.Figure()
    fig_bar.add_trace(go.Bar(name="Entry", x=["Entry"], y=[entry], marker_color="green"))
    fig_bar.add_trace(go.Bar(name="TP", x=["TP"], y=[tp], marker_color="orange"))
    fig_bar.add_trace(go.Bar(name="SL", x=["SL"], y=[sl], marker_color="red"))
    fig_bar.add_trace(go.Bar(name="Price", x=["Current"], y=[price], marker_color="blue"))
    fig_bar.update_layout(barmode="group", template="plotly_dark", height=300)
    st.plotly_chart(fig_bar, use_container_width=True)

else:
    st.warning("⚠️ Could not fetch price. Please check your internet or try again.")

# --- Footer --- #
st.markdown("---", unsafe_allow_html=True)
st.markdown("""
<div style='text-align: center; color: gray;'>
    <p style='font-size: 14px;'>Powered by</p>
    <p style='font-size: 18px; font-weight: bold;'>FATODU INSIGHTS & SOLUTIONS</p>
</div>
""", unsafe_allow_html=True)
