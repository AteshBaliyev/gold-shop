import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";
import { INITIAL_ACCOUNTS } from "../data/mockData";

const ACCOUNTS_COLLECTION = "accounts";

/**
 * Realtime listener for accounts from Firestore.
 * If the collection is empty on first load, it seeds INITIAL_ACCOUNTS into Firestore.
 */
export function subscribeAccounts(onData, onError) {
  try {
    const colRef = collection(db, ACCOUNTS_COLLECTION);

    const unsubscribe = onSnapshot(
      colRef,
      async (snapshot) => {
        if (snapshot.empty) {
          console.log("Firebase Firestore 'accounts' kolleksiyası boşdur. İlkin hesablar yüklənir...");
          // Seed initial accounts
          try {
            await seedInitialAccounts();
          } catch (seedErr) {
            console.warn("İlkin hesabları Firebase-ə yükləmək mümkün olmadı:", seedErr);
            // Fall back to initial accounts directly
            onData(INITIAL_ACCOUNTS, false);
          }
        } else {
          const accountsList = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              ...data,
              id: docSnap.id
            };
          });

          // Sort by createdAt descending if available, or keep ID order
          accountsList.sort((a, b) => {
            if (b.createdAt && a.createdAt) {
              const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt || 0);
              const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt || 0);
              return timeB - timeA;
            }
            return 0;
          });

          onData(accountsList, true);
        }
      },
      (error) => {
        console.warn("Firebase Firestore xətası (offline və ya qaydalar məhduddur):", error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error("Firebase abunəliyi xətası:", err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Seed initial accounts into Firestore
 */
export async function seedInitialAccounts() {
  const promises = INITIAL_ACCOUNTS.map(async (acc, index) => {
    const docRef = doc(db, ACCOUNTS_COLLECTION, String(acc.id || `acc-${index + 1}`));
    return setDoc(docRef, {
      ...acc,
      createdAt: Date.now() - (index * 1000 * 60)
    }, { merge: true });
  });
  await Promise.all(promises);
}

/**
 * Add or update an account in Firestore
 */
export async function saveAccountToFirebase(account) {
  try {
    const accountId = String(account.id || `acc-${Date.now()}`);
    const docRef = doc(db, ACCOUNTS_COLLECTION, accountId);
    
    const payload = {
      ...account,
      id: accountId,
      updatedAt: Date.now()
    };
    
    if (!account.createdAt) {
      payload.createdAt = Date.now();
    }

    await setDoc(docRef, payload, { merge: true });
    return { success: true, id: accountId };
  } catch (error) {
    console.error("Hesabı Firebase-ə yazarkən xəta:", error);
    throw error;
  }
}

/**
 * Delete an account from Firestore
 */
export async function deleteAccountFromFirebase(accountId) {
  try {
    const docRef = doc(db, ACCOUNTS_COLLECTION, String(accountId));
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Hesabı Firebase-dən silərkən xəta:", error);
    throw error;
  }
}
