import styles from "./inventory.module.css";
import MainContainer from "../../../components/maincontainer/maincontainer";
import Header from "../../../components/mainheader/header";
import SubContainer from "../../../components/subcontainer/subcontainer";
import OutlineButton from "../../../components/outlinebutton/outlinebutton";
import { BsSteam } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import InventoryComponent from "../../../components/inventorycomponent/inventorycomponent";
import InventoryModal from "../../../components/inventorymodal/inventorymodal";
import Axios from "../../../api/agent";
import useContextStore from "../../../context";

function Inventory() {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [entityName, setEntityName] = useState("");
  const [rarity, setRarity] = useState("");
  const [purchasable, setPurchasable] = useState("");
  const {
    userStore: {
      user: { balance = 0 },
      setBalance,
    },
  } = useContextStore();

  const toggleModal = async (image, itemName, price, entityName, rarity, purchasable, sell, consume) => {
    setModal(!modal);
    setImage(image);
    setItemName(itemName);
    setPrice(price);
    setEntityName(entityName);
    setRarity(rarity);
    setPurchasable(purchasable);


    if (consume === true) {
      const removeItem = await Axios("/api/user/setitem", "POST", {
        item: entityName,
        add: false
      });
    }
    if (sell === true) {
      console.log(entityName);
      console.log(price);
      console.log(sell);
      console.log("Complete Sell Here");

      var newBalanceVariable = balance + price;
      setBalance(newBalanceVariable);
      const addBalance = await Axios("/api/user/setbalance", "POST", {
        balance: newBalanceVariable,
      });

      const removeItem = await Axios("/api/user/setitem", "POST", {
        item: entityName,
        add: false
      });
    }
  };

  const purchase = (price, image, itemName, entityName, rarity, purchasable) => {
    toggleModal(image, itemName, price, entityName, rarity, purchasable);
  };

  const finalPurchase = () => {
    console.log("placeholder");
  };

  return (
    <>
      <MainContainer>
        <SubContainer>
          <Header title="Inventory"> </Header>
          <div className={styles.titleSubtext}>
            {" "}
            View and search through your inventory effortlessly.
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.buttonContainerMain}>
              <div className={styles.buttonContainerLeft}>
                <div className={styles.priceText}>
                  {" "}
                  <BsSteam /> Total Price: <span className={styles.priceTag}> £2837.39 </span>{" "}
                </div>
              </div>
              <div className={styles.buttonContainerRight}>
                <OutlineButton
                  title="Refresh"
                  click={() => {
                    window.location.reload();
                  }}
                />
                <OutlineButton
                  title="Add SCR"
                  click={() => {
                    toggleModal();
                  }}
                />
                <OutlineButton title="Filter" />
                <input type="text" className={styles.searchBar} placeholder="Search.."></input>
              </div>
            </div>
            <div className={styles.inventoryContainer}>
              <div className={styles.inventoryBox}>
                <div className={styles.inventoryColumn}>
                  <InventoryComponent purchase={purchase} />
                </div>
              </div>
            </div>
          </div>
          <InventoryModal modal={modal} toggleModal={toggleModal} finalPurchase={finalPurchase} image={image} itemName={itemName} price={price} entityName={entityName} rarity={rarity} purchasable={purchasable} />
        </SubContainer>
      </MainContainer>
    </>
  );
}

export default observer(Inventory);
